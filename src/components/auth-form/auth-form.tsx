import { FC, ReactNode } from 'react';
import { ButtonUI } from '../ui';
type TAuthFormProps = {
  onSubmit: () => void;
  children: ReactNode;
  buttonText: ReactNode;
  title?: string;
  description?: string;
  valid: boolean;
};

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
    onSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (valid && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <form noValidate onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        {children}
        <ButtonUI
          disabled={!valid}
          htmlType="submit"
          style={{ type: 'primary', variant: 'contained' }}
        >
          {buttonText}
        </ButtonUI>
      </form>
    </div>
  );
};
