import { FC, ReactNode } from 'react';

interface InputWrapperProps {
  children: ReactNode;
}
export const InputWrapper: FC<InputWrapperProps> = ({ children }) => {
  return <div className="gap-x-4 md:grid md:grid-cols-2 md:gap-x-8">{children}</div>;
};
