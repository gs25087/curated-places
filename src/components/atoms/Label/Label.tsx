import styles from '@/styles/atoms/Label/Label.module.css';

interface IProps {
  required?: boolean;
  label: string;
  name: string;
}

export const Label = ({ required, label, name }: IProps) => {
  return (
    <label htmlFor={name} className={styles.label}>
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
};
