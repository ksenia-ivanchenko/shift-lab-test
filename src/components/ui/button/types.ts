import { ReactNode } from 'react';

export type TButtonStyleProps = {
  type: 'secondary' | 'primary' | 'tertiary';
  variant: 'contained' | 'text' | 'link';
};

export type TButtonUIProps = {
  children: ReactNode;
  htmlType: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  style: TButtonStyleProps;
  disabled?: boolean;
};
