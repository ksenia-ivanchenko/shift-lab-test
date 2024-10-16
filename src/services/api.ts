import { getCookie, setCookie } from './cookie';

const URL = import.meta.env.VITE_API_URL;

export type TLoginData = {
  phone: string;
  code: number;
};

export type TUser = {
  phone: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  email?: string;
  city?: string;
};

export type TSignInResponse = {
  success: boolean;
  user: TUser;
  token: string;
  reason?: string;
};

export type TCreateOtpData = {
  phone: string;
};

export type TCreateOtpResponse = {
  success: boolean;
  reason: boolean;
  retryDelay: number;
};

export type TGetUserSessionResponse = {
  success: boolean;
  user: TUser;
  reason?: string;
};

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok
    ? res.json()
    : res
        .json()
        .then((res) => res.reason)
        .then((data) => Promise.reject({ message: data }));
// const checkResponse = <T>(res: Response): Promise<T> => {
//   console.log('Ответ от сервера:', res);
//   if (res.ok) {
//     return res.json();
//   } else {
//     return res.text().then((text) => {
//       console.log('Текст ответа:', text); // Логируйте текст ответа
//       try {
//         const json = JSON.parse(text);
//         return Promise.reject({
//           message: json.error || 'Ошибка сервера',
//           ...json,
//         });
//       } catch {
//         return Promise.reject({
//           message: 'Не удалось разобрать ответ от сервера',
//           raw: text,
//         });
//       }
//     });
//   }
// };

export const signInApi = (data: TLoginData) =>
  fetch(`${URL}/users/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TSignInResponse>(res))
    .then((data) => {
      if (data?.success) {
        console.log(`авторизация пройдена! ответ сервера:`);
        console.log(data);
        setCookie('accessToken', data.token);
        return data;
      }
      return Promise.reject(data);
    });

export const createOtpApi = (data: TCreateOtpData) =>
  fetch(`${URL}/auth/otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TCreateOtpResponse>(res))
    .then((data) => {
      if (data?.success) {
        console.log('отп создан');
        return data;
      }
      return Promise.reject(data);
    });

export const getUserSessionApi = () =>
  fetch(`${URL}/users/session`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: `Bearer ${getCookie('accessToken')}`,
    } as HeadersInit,
  })
    .then((res) => checkResponse<TGetUserSessionResponse>(res))
    .then((data) => {
      if (data?.success) {
        console.log('пользователь авторизован! данные о пользователе:');
        console.log(data.user);
        return data.user;
      }
      return Promise.reject(data);
    });
