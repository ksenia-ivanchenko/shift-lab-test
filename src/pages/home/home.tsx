import { FC } from 'react';
import styles from './home.module.scss';
import { ButtonUI, Preloader } from '../../components/ui';
import { deleteCookie } from '../../services/cookie';
import { useDispatch, useSelector } from '../../store';
import { resetUser } from '../../store/slices';

export const HomePage: FC = () => {
  const dispatch = useDispatch();
  const { loading, isAuthChecked } = useSelector((state) => state.user);

  if (!isAuthChecked || loading) {
    return (
      <main className={styles.content}>
        <Preloader />{' '}
      </main>
    );
  }

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
