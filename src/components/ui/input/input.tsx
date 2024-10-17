import styles from './input.module.scss';
import { TInputUIProps } from './types';
import clsx from 'clsx';
import React from 'react';

export const InputUI = React.forwardRef<HTMLInputElement, TInputUIProps>(
  (
    {
      placeholder,
      error,
      inputType,
      value,
      onChange,
      onKeyPress,
      disabled,
      id,
      label,
      hintMesage,
    },
    ref
  ) => (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        className={clsx(styles.input, {
          [styles.invalid]: error,
        })}
        placeholder={placeholder}
        type={inputType}
        value={value}
        disabled={disabled ? true : false}
        onChange={onChange}
        onKeyPress={onKeyPress}
        ref={ref}
      />
      {hintMesage && !error && !value && (
        <span className={styles.hint}>{hintMesage}</span>
      )}

      {/* {error && <span className={styles.error}>{error}</span>} */}
      <span
        className={styles.error}
        style={{ visibility: error ? 'visible' : 'hidden' }}
      >
        {error}
      </span>
    </div>
  )
);
