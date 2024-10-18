import { createAsyncThunk } from '@reduxjs/toolkit';
import { TLoginData } from '../../../services/types';
import { getUserSessionApi, signInApi } from '../../../services/api';
import { deleteCookie, getCookie, setCookie } from '../../../services/cookie';
import { authChecked, setAuthorized, setUser } from './user-slice';

export const signIn = createAsyncThunk(
  'user/signIn',
  async ({ phone, code }: TLoginData) => {
    const data = await signInApi({ phone, code });
    setCookie('accessToken', data.token);
    localStorage.setItem('accessToken', data.token);
    return data.user;
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/getUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserSessionApi()
        .then((res) => {
          dispatch(setUser(res));
          dispatch(setAuthorized());
        })
        .catch(() => {
          deleteCookie('accessToken');
        })
        .finally(() => {
          dispatch(authChecked());
        });
    } else {
      dispatch(authChecked());
      console.log('no access token');
    }
  }
);
