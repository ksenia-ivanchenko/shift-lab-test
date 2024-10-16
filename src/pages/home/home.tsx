import { FC } from 'react';
import styles from './home.module.scss';
import { ButtonUI } from '../../components/ui';
import { deleteCookie } from '../../services/cookie';
import { useDispatch } from '../../store';
import { resetUser } from '../../store/slices';

export const HomePage: FC = () => {
  const dispatch = useDispatch();
  return (
    <main className={styles.content}>
      Здесь могла быть ваша главная страница
      <ButtonUI
        htmlType="button"
        style={{ type: 'secondary', variant: 'contained' }}
        onClick={() => {
          dispatch(resetUser());
          deleteCookie('accessToken');
        }}
      >
        Разлогиниться
      </ButtonUI>
    </main>
  );
};
