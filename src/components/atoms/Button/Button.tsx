import { useMapContext } from '@/context/MapContext/MapContext';
import { ACTIONS } from '@/context/MapContext/MapReducer';
import { ReactElement } from 'react';

interface IProps {
  label: string;
  icon?: ReactElement;
  type: 'button' | 'submit' | 'reset';
  disabeld?: boolean;
  onClick?: () => void;
}

export const Button = ({ label, icon, type, onClick, ...props }: IProps): ReactElement => {
  return (
    <button
      className={` mr-0.5 flex cursor-pointer items-center gap-x-1 rounded-full border  border-black py-1  px-4 text-black transition transition-colors last:mr-0 hover:bg-primary hover:shadow-primary-100`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {label}
      {icon}
    </button>
  );
};
