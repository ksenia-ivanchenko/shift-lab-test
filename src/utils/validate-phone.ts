export const validatePhone = (value: string) => {
  const phoneRegex = /^(?:8|\+7|7)\d{10}$/;
  if (!value) {
    return 'Поле является обязательным';
  }
  if (!phoneRegex.test(value)) {
    return 'Введите корректный номер';
  }
  return '';
};

export const allowedKeys = [
  'Backspace',
  'Tab',
  'ArrowLeft',
  'ArrowRight',
  'Delete',
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (value: any) => /^[0-9]$/.test(value);
