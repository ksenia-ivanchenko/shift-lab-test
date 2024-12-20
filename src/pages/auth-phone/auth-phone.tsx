import { FC, useEffect, useRef, useState } from 'react';
import { AuthForm } from '../../components';
import { useNavigate } from 'react-router-dom';
import { InputUI, Preloader } from '../../components/ui';
import {
  allowedKeys,
  isNumber,
  validatePhone,
} from '../../utils/validate-phone';
import { formatPhoneNumber } from '../../utils/format-phone-number';
import styles from './auth-phone.module.scss';
import { useDispatch } from '../../store';
import { createOtpApi } from '../../services/api';
import { setUser } from '../../store/slices';

export const AuthPhonePage: FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async () => {
    // eslint-disable-next-line no-useless-escape
    const phoneRequest = phone.replace(/[\+\s]/g, '').replace(/^7/, '8');
    setLoading(true);
    try {
      await createOtpApi({ phone: phoneRequest });
    } finally {
      dispatch(setUser({ phone: phoneRequest }));
      setLoading(false);
      navigate('/otp');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    const validationError = validatePhone(formattedValue.replace(/\s+/g, ''));
    setPhone(formattedValue);
    setError(validationError);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (!allowedKeys.includes(e.key) && !isNumber(e.key)) ||
      phone.replace(/\s+/g, '').length > 11
    ) {
      e.preventDefault();
    }
  };

  return (
    <main className={styles.content}>
      <AuthForm
        onSubmit={handleSubmit}
        buttonText={loading ? <Preloader /> : 'Продолжить'}
        title="Вход"
        description="Введите номер телефона для входа в личный кабинет"
        valid={!error && phone.length > 0}
      >
        <InputUI
          placeholder="Телефон"
          inputType="tel"
          error={error}
          value={phone}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          id="phone"
          ref={inputRef}
        />
      </AuthForm>
    </main>
  );
};
