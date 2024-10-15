import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../../components';
import { ButtonUI, InputUI } from '../../components/ui';
import { validateOtp } from '../../utils/validate-otp';
import { allowedKeys, isNumber } from '../../utils/validate-phone';

export const AuthOtpPage: FC = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(120);
  const [canRequest, setCanRequest] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

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

  const requestCode = () => {
    // Логика запроса кода

    setSeconds(120);
    setCanRequest(false);
  };

  const handleSubmit = () => {
    navigate('/');
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
    <>
      <AuthForm
        onSubmit={handleSubmit}
        buttonText={'Продолжить'}
        title="Вход"
        description="Введите проверочный код для входа в личный кабинет"
        valid={!error && otp.length > 0}
      >
        <InputUI placeholder="Телефон" value="89149031579" disabled />
        <InputUI
          placeholder="Проверочный код"
          inputType="number"
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          error={error}
        />
      </AuthForm>
      <ButtonUI
        htmlType="button"
        style={{ type: 'tertiary', variant: 'link' }}
        onClick={() => navigate('/auth/phone')}
      >
        Ввести другой номер телефона
      </ButtonUI>
      {canRequest ? (
        <ButtonUI
          onClick={requestCode}
          htmlType="button"
          style={{ type: 'secondary', variant: 'text' }}
        >
          Запросить код ещё раз
        </ButtonUI>
      ) : (
        <span>Запросить код повторно можно через {seconds} секунд</span>
      )}
    </>
  );
};
