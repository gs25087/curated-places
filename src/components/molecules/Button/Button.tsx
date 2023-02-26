import { useMapContext } from '@/context/MapContext/MapContext';
import { ACTIONS } from '@/context/MapContext/MapReducer';
import { ReactElement } from 'react';

interface IProps {
  label: string;
  icon?: ReactElement;
  type: 'button' | 'submit' | 'reset';
}

export const Button = ({ label, icon, type }: IProps): ReactElement => {
  return (
    <button
      className={` mr-0.5 flex cursor-pointer items-center gap-x-1 rounded-full border  bg-primary py-2 px-2.5 font-bold tracking-wider text-black transition last:mr-0 hover:bg-black hover:text-white`}
      type={type}
    >
      {label}
      {icon}
    </button>
  );
};
