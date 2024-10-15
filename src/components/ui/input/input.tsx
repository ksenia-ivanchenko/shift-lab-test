import { FC } from 'react';
import styles from './input.module.scss';

type TInputUIProps = {
  placeholder: string;
  error?: string;
  inputType?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export const InputUI: FC<TInputUIProps> = ({
  placeholder,
  error,
  inputType,
  value,
  onChange,
  onKeyPress,
  disabled,
}) => (
  <>
    <input
      className={styles.input}
      placeholder={placeholder}
      type={inputType}
      value={value}
      disabled={disabled ? true : false}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
    {error && <span>{error}</span>}
  </>
);
