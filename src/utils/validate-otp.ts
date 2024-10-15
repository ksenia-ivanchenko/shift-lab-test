export const validateOtp = (otp: string) => {
  const regex = /^\d{6}$/;
  if (regex.test(otp)) {
    return '';
  } else {
    return 'Код должен содержать 6 цифр';
  }
};
