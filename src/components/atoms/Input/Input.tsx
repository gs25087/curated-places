import { FieldError, UseFormRegister } from 'react-hook-form';

import styles from '@/styles/atoms/Input/Input.module.css';

import { Label } from '@/components/atoms';
import { IFormData } from '@/components/molecules/Account/Account';

type InputFieldType =
  | 'text'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'password'
  | 'submit'
  | 'file'
  | 'email'
  | 'tel';

interface FormField {
  name: string;
  label?: string;
  register: UseFormRegister<IFormData>;
  errors?: FieldError | undefined;
  required?: boolean;
  type?: InputFieldType;
  placeholder?: string;
  classes?: string[];
}

export const Input = ({
  name,
  label,
  register,
  errors,
  required,
  type,
  placeholder,
  classes
}: FormField) => {
  return (
    <div className={`form-control-input  ${styles.fieldWrapper} ${classes?.join(' ')}`}>
      {label && <Label required={required} label={label} name={name} />}
      <input
        id={name}
        type={type || 'text'}
        //@ts-ignore
        {...register(name)}
        className={`leading-8 ${errors ? 'border-red-500' : 'border-black'} ${styles.input}`}
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
