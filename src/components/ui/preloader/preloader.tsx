import { FC } from 'react';
import styles from './preloader.module.scss';

export const Preloader: FC = () => (
  <div className={styles.preloader}>
    <div className={styles.preloader_circle} />
  </div>
);
