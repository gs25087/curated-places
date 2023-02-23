import { ReactElement } from 'react';

interface IProps {
  icon: ReactElement;
}

export const Icon = ({ icon }: IProps): ReactElement => {
  return (
    <div className="color-black flex items-center py-3 px-1 text-xl transition hover:scale-[0.98]">
      {icon}
    </div>
  );
};
