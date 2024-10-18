import { getCookie, setCookie } from './cookie';
import {
  TCreateOtpData,
  TCreateOtpResponse,
  TGetUserSessionResponse,
  TLoginData,
  TSignInResponse,
} from './types';

const URL = import.meta.env.VITE_API_URL;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok
    ? res.json()
    : res
        .json()
        .then((res) => res.reason)
        .then((data) => Promise.reject({ message: data }));

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
