import { useMapContext } from '@/context/MapContext/MapContext';
import { ACTIONS } from '@/context/MapContext/MapReducer';
import { ReactElement } from 'react';

interface IProps {
  label: string;
  shadow?: boolean;
  border?: boolean;
  icon?: ReactElement;
  size?: string;
  filter?: boolean;
  id?: number;
}

type Padding = {
  [key: string]: string;
};

const padding: Padding = {
  sm: 'px-2.5 py-0.25',
  md: 'px-3 py-0.5',
  lg: 'px-3.5 py-0.75'
};

export const Tag = ({ label, shadow, border, icon, size, id, filter }: IProps): ReactElement => {
  const { dispatch } = useMapContext();

  return (
    <div
      className={`py-0.25 mr-0.5 flex  items-center gap-x-1 rounded-full border border-primary bg-white px-2.5 last:mr-0
				${size ? padding[size] : padding['sm']}
				text-${size ? size : 'sm'}  
				${filter ? 'cursor-pointer' : ''} 
				${shadow ? 'shadow-md' : ''} 
        ${border ? 'border border-primary bg-primary' : ''} `}
      onClick={() => filter && dispatch({ type: ACTIONS.SET_CATEGORY, payload: id })}
    >
      {label}
      {icon}
    </div>
  );
};
