import { useMapContext } from '@/context/MapContext/MapContext';
import { ACTIONS } from '@/context/MapContext/MapReducer';
import Chip from '@mui/material/Chip';
import { FC, useEffect, useState } from 'react';
import React from 'react';
import { ISelectedTaxonomy } from 'src/types/taxonomy/taxonomy';
import { ISubCategory } from 'src/types/types';

import { TaxonomyButton } from '@/components/atoms/TaxonomyButton';

import { CategoriesDialog } from '../CategoriesDialog';

export const TaxonomyBar: FC = () => {
  //@ts-ignore
  const { state, dispatch } = useMapContext();
  const [open, setOpen] = useState<boolean>(false);

  const [selection, setSelection] = useState<null | ISelectedTaxonomy>(null);
  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (selection) {
      dispatch({
        type: ACTIONS.SET_TAXONOMY,
        //@ts-ignore
        payload: { id: selection.id, level: selection.level }
      });
    }
  }, [selection]);

  return (
    <div className="no-scrollbar max-w-s fixed z-40  h-[2.3rem] w-full -translate-y-full transform overflow-x-auto px-[1px] before:absolute before:top-0 before:h-3 before:w-full before:bg-white before:content-[''] md:max-w-md">
      <div className="absolute flex px-pageMargin pb-3">
        {state.subcategories && state.subcategories.length > 0 ? (
          <>
            {state.subcategories.map(
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
          </>
        ) : null}

        <CategoriesDialog setOpen={setOpen} open={open} setSelection={setSelection} />
      </div>
    </div>
  );
};
