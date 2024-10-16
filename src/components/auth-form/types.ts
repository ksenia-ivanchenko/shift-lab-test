import { ReactNode } from "react";

export type TAuthFormProps = {
    onSubmit: () => void;
    children: ReactNode;
    buttonText: ReactNode;
    title?: string;
    description?: string;
    valid: boolean;
  };