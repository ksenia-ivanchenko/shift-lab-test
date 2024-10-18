import { FC } from 'react';
import { ButtonUI } from '../ui';
import { TAuthFormProps } from './types';
import styles from './auth-form.module.scss';

export const AuthForm: FC<TAuthFormProps> = ({
  onSubmit,
  children,
  title,
  description,
  buttonText,
  valid,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (valid) {
      onSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (valid && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      className={styles.form}
      data-testid="auth-form"
    >
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      {children}
      <div className={styles.button}>
        <ButtonUI
          disabled={!valid}
          htmlType="submit"
          style={{ type: 'primary', variant: 'contained' }}
        >
          {buttonText}
        </ButtonUI>
      </div>
    </form>
  );
};
