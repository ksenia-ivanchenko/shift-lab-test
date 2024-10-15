import { FC, useState } from 'react';
import { AuthForm } from '../../components';
import { useNavigate } from 'react-router-dom';
import { InputUI } from '../../components/ui';
import {
  allowedKeys,
  isNumber,
  validatePhone,
} from '../../utils/validate-phone';
import { formatPhoneNumber } from '../../utils/format-phone-number';

export const AuthPhonePage: FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    navigate('/auth/otp');
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
    <AuthForm
      onSubmit={handleSubmit}
      buttonText={'Продолжить'}
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
      />
    </AuthForm>
  );
};
