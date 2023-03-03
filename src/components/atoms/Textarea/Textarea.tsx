import { FieldError, UseFormRegister } from 'react-hook-form';
import { IAddPostFormData } from 'src/types/types';

import styles from '@/styles/atoms/Input/Input.module.css';

import { Label } from '@/components/atoms';

interface FormField {
  name: string;
  label?: string;
  register: UseFormRegister<IAddPostFormData>;
  errors?: FieldError;
  required?: boolean;
  placeholder?: string;
  classes?: string[];
}

export const Textarea = ({
  name,
  label,
  register,
  errors,
  required,
  placeholder,
  classes
}: FormField) => {
  return (
    <div className={`form-control-input  ${styles.fieldWrapper} ${classes?.join(' ')}`}>
      {label && <Label required={required} label={label} name={name} />}
      <textarea
        id={name}
        //@ts-ignore
        {...register(name)}
        className={`text-xs leading-4 ${errors ? 'border-red-500' : 'border-black'} ${
          styles.input
        }`}
        placeholder={placeholder}
      />

      {errors && (
        <p className="mt-2 text-xs text-red-600" id={`${name}-error`}>
          {errors.message}
        </p>
      )}
    </div>
  );
};
