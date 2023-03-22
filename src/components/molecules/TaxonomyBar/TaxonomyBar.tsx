import { useMapContext } from '@/context/MapContext/MapContext';
import { FC } from 'react';
import { ISubCategory } from 'src/types/types';

import { TaxonomyButton } from '@/components/atoms/TaxonomyButton';

export const TaxonomyBar: FC = () => {
  //@ts-ignore
  const { state } = useMapContext();

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
      </div>
    </div>
  );
};
