import { useMapContext } from '@/context/MapContext/MapContext';
import { ACTIONS } from '@/context/MapContext/MapReducer';
import Chip from '@mui/material/Chip';
import { IMapContext, ITaxonomyButtonProps } from 'src/types/types';

export const TaxonomyButton = ({
  label,
  level,
  filter = false,
  id,
  size = 'medium'
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
    <Chip
      {...(filter && { onClick: handleClick })}
      label={label}
      variant="outlined"
      size={size}
      className={`${filter ? 'cursor-pointer' : ''} mr-1 last:mr-0`}
    />
  );
};
