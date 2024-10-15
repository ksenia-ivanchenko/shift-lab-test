import { FC, ReactNode } from 'react';
import styles from './button.module.scss';
import clsx from 'clsx';

type TButtonStyleProps = {
  type: 'secondary' | 'primary' | 'tertiary';
  variant: 'contained' | 'text' | 'link';
};

type TButtonUIProps = {
  children: ReactNode;
  htmlType: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  style: TButtonStyleProps;
  disabled?: boolean;
};

export const ButtonUI: FC<TButtonUIProps> = ({
  children,
  htmlType,
  onClick,
  style,
  disabled,
}) => (
  <button
    className={clsx(styles.button, {
      [styles.primary]: style.type === 'primary',
      [styles.secondary]: style.type === 'secondary',
      [styles.tertiary]: style.type === 'tertiary',
      [styles.contained]: style.variant === 'contained',
      [styles.text]: style.variant === 'text',
      [styles.link]: style.variant === 'link',
    })}
    type={htmlType}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
