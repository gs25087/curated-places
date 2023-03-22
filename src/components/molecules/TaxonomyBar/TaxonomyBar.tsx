import { useMapContext } from '@/context/MapContext/MapContext';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { DotsThree } from '@phosphor-icons/react';
import { FC, useState } from 'react';
import React from 'react';
import { ISubCategory } from 'src/types/types';

import { TaxonomyButton } from '@/components/atoms/TaxonomyButton';

import { CategoriesSelection } from '../CategoriesSelection';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const TaxonomyBar: FC = () => {
  //@ts-ignore
  const { state } = useMapContext();
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="no-scrollbar max-w-s fixed z-40  h-[2.3rem] w-full -translate-y-full transform overflow-x-auto px-[1px] before:absolute before:top-0 before:h-3 before:w-full before:bg-white before:content-[''] md:max-w-md">
      <div className="absolute flex px-pageMargin pb-3">
        {state.subcategories &&
          state.subcategories.length > 0 &&
          state.subcategories.map(
            (item: ISubCategory) =>
              item.label &&
              item.id && (
                <TaxonomyButton
                  key={item.label}
                  label={item.label}
                  level={1}
                  filter={true}
                  id={item.id}
                />
              )
          )}

        <Chip
          icon={<DotsThree />}
          label="More"
          variant="outlined"
          size="small"
          onClick={handleClick}
        />

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="taxonomy-dialog-title"
          aria-describedby="taxonomy-dialog-description"
        >
          <CategoriesSelection setOpen={setOpen} />
        </Dialog>
      </div>
    </div>
  );
};
