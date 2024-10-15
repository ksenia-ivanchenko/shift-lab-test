export const formatPhoneNumber = (value: string) => {
  value = value.replace(/\D/g, '');

  if (value.startsWith('8')) {
    value = value.replace(/^8/, '7');
  } else if (value.startsWith('9')) {
    value = '7' + value;
  } else if (!value.startsWith('7')) {
    return value;
  }

  let formatted = '+7 ';

  if (value.length > 1) {
    formatted += value.slice(1, 4);
  }
  if (value.length > 4) {
    formatted += ' ' + value.slice(4, 7);
  }
  if (value.length > 7) {
    formatted += ' ' + value.slice(7, 9);
  }
  if (value.length > 9) {
    formatted += ' ' + value.slice(9, 11);
  }

  return formatted.trim();
};
