import { useMapContext } from '@/context/MapContext/MapContext';
import { ACTIONS } from '@/context/MapContext/MapReducer';
import { IMapContext, ITaxonomyButtonProps } from 'src/types/types';

export const TaxonomyButton = ({
  label,
  level,
  filter = false,
  id,
  size = 'sm'
}: ITaxonomyButtonProps): JSX.Element => {
  //@ts-ignore
  const { state, dispatch } = useMapContext<IMapContext>();

  const handleClick = () => {
    if (state?.taxonomy.id === id && state?.taxonomy.level === level) {
      dispatch({ type: ACTIONS.SET_TAXONOMY, payload: { level: null, id: null } });
    } else {
      dispatch({ type: ACTIONS.SET_TAXONOMY, payload: { level, id } });
    }
  };

  return (
    <>
      <div
        {...(filter && { onClick: handleClick })}
        className={`tap-transparent py-0.25 mr-0.5 flex   items-center gap-x-1 overflow-hidden whitespace-nowrap rounded-full border  border-black px-2 text-sm shadow transition-colors last:mr-0
        ${size ? 'text-' + size : ''}
				${filter ? 'cursor-pointer' : ''} 
        ${
          state?.taxonomy.id === id && state?.taxonomy.level === level && filter
            ? 'bg-primary-LIGHT'
            : 'bg-white'
        } `}
      >
        {label}
      </div>
    </>
  );
};
