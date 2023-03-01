import { ReactElement } from 'react';

interface IProps {
  title: string;
}

export const FormTitle = ({ title }: IProps): ReactElement => {
  return <h1 className="mb-8 text-2xl ">{title}</h1>;
};
