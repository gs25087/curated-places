import { IFormStatusMessage } from 'src/types/types';

export const FormStatusMessage = ({ status, message }: IFormStatusMessage) => (
  <p className={`mt-4 w-full text-sm ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
    {message}
  </p>
);
