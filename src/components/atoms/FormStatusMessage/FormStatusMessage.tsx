import { IFormStatusMessage } from 'src/types/types';

export const FormStatusMessage = ({ status, message }: IFormStatusMessage) => (
  <p
    className={`my-4 w-full text-center text-sm ${
      status === 'success' ? 'text-green-500' : 'text-red-500'
    }`}
  >
    {message}
  </p>
);
