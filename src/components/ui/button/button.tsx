import React from 'react';
import styles from './button.module.scss';

export const ButtonUI = React.forwardRef(() => (
  <>
    <button className={styles.button}>привет</button>
  </>
));
