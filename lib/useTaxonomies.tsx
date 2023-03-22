import { useMapContext } from '@/context/MapContext/MapContext';
import { IMapContext, ITaxonomyBase } from 'src/types/types';

export const useTaxonomies = ({ id, level }: { id: number | null; level: number | null }) => {
  //@ts-ignore
  const { state } = useMapContext<IMapContext>();

  const taxonomyItems = state[level === 1 ? 'subcategories' : 'subsubcategories'];
  const taxonomyItem = taxonomyItems?.find((tax: ITaxonomyBase) => tax.id === id);

  return { label: taxonomyItem?.label, id: taxonomyItem?.id, level };
};
