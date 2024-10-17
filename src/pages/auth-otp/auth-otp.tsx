import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../../components';
import { ButtonUI, InputUI, Preloader } from '../../components/ui';
import { validateOtp } from '../../utils/validate-otp';
import { allowedKeys, isNumber } from '../../utils/validate-phone';
import styles from './auth-otp.module.scss';
import { useDispatch, useSelector } from '../../store';
import { formatPhoneNumber } from '../../utils/format-phone-number';
import { signIn } from '../../store/slices';
import { createOtpApi } from '../../services/api';

export const AuthOtpPage: FC = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(120);
  const [canRequest, setCanRequest] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const { user, requestError, authorized, loading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setCanRequest(true);
    }
  }, [seconds]);

  useEffect(() => {
    if (requestError) {
      setError(requestError);
    }
    if (authorized) {
      navigate('/home');
    }
  }, [requestError, authorized]);

  const requestCode = () => {
    createOtpApi({ phone: user.phone });
    setSeconds(120);
    setCanRequest(false);
  };

  const handleSubmit = () => {
    dispatch(signIn({ phone: user.phone, code: Number(otp) }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validationError = validateOtp(e.target.value);
    setError(validationError);
    setOtp(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((!allowedKeys.includes(e.key) && !isNumber(e.key)) || otp.length > 5) {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.content}>
      <AuthForm
        onSubmit={handleSubmit}
        buttonText={loading ? <Preloader /> : 'Войти'}
        title="Вход"
        description="Введите проверочный код для входа в личный кабинет"
        valid={!error && otp.length > 0}
      >
        <InputUI
          placeholder="Телефон"
          value={formatPhoneNumber(user.phone)}
          disabled
          id="phone"
        />
        <InputUI
          placeholder="Проверочный код"
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          error={error}
          id="otp"
          ref={inputRef}
        />
      </AuthForm>
      {canRequest ? (
        <div className={styles.again_button}>
          <ButtonUI
            onClick={requestCode}
            htmlType="button"
            style={{ type: 'secondary', variant: 'text' }}
          >
            Запросить код ещё раз
          </ButtonUI>
        </div>
      ) : (
        <span className={styles.again}>
          Запросить код повторно можно через {seconds} секунд
        </span>
      )}
      <div className={styles.another_phone}>
        <ButtonUI
          htmlType="button"
          style={{ type: 'tertiary', variant: 'link' }}
          onClick={() => navigate('/auth')}
        >
          Ввести другой номер телефона
        </ButtonUI>
      </div>
    </div>
  );
};
