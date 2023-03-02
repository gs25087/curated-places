import { useMapContext } from '@/context/MapContext/MapContext';
import { ACTIONS } from '@/context/MapContext/MapReducer';
import { ReactElement } from 'react';

import styles from '@/styles/atoms/Button/Button.module.css';

interface IProps {
  label: string;
  icon?: ReactElement;
  type: 'button' | 'submit' | 'reset';
  disabeld?: boolean;
  onClick?: () => void;
  color?: 'primary' | 'white';
  classes?: string;
}

export const Button = ({
  label,
  icon,
  type,
  onClick,
  color = 'primary',
  classes = '',
  ...props
}: IProps): ReactElement => {
  return (
    <button
      className={`${styles.button} bg-${color} ${classes}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {label}
      {icon}
    </button>
  );
};
