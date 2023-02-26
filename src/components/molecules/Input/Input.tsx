import { SignUpFormData } from '@/pages/signup';
import { FieldError, UseFormRegister } from 'react-hook-form';

type InputFieldType =
  | 'text'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'password'
  | 'file'
  | 'email'
  | 'tel';

interface FormField {
  name: keyof SignUpFormData;
  label: string;
  register: UseFormRegister<SignUpFormData>;
  errors: FieldError | undefined;
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
    <div className={'form-control-input mt-6 ' + classes?.join(' ')}>
      <label htmlFor={name} className="block text-xs text-black">
        {label}
        {required && '*'}
      </label>
      <input
        id={name}
        type={type || 'text'}
        {...register(name)}
        className={`${
          errors ? 'border-red-500' : 'border-black'
        } block w-full  border-b  text-xs focus:outline-none`}
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
