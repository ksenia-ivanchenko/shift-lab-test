import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createOtpApi,
  getUserSessionApi,
  signInApi,
  TCreateOtpData,
  TLoginData,
  TUser,
} from '../../services/api';
import { deleteCookie, getCookie, setCookie } from '../../services/cookie';

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

export const createOtp = createAsyncThunk(
  'user/createOtp',
  async ({ phone }: TCreateOtpData) => {
    const data = await createOtpApi({ phone });
    return data;
  }
);

type TUsersState = {
  user: TUser;
  loading: boolean;
  requestError?: string;
  isAuthChecked: boolean;
  authorized: boolean;
};

const initialState: TUsersState = {
  user: {
    phone: '',
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    city: '',
  },
  authorized: false,
  isAuthChecked: false,
  loading: false,
  requestError: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = {
        phone: '',
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        city: '',
      };
      state.authorized = false;
    },
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    setAuthorized: (state) => {
      state.authorized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.requestError = '';
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.requestError = action.error.message;
        state.isAuthChecked = true;
        state.authorized = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.requestError = '';
        state.user = action.payload;
        state.isAuthChecked = true;
        state.authorized = true;
      });
    builder
      .addCase(createOtp.pending, (state) => {
        state.loading = true;
        state.requestError = '';
      })
      .addCase(createOtp.rejected, (state, action) => {
        state.loading = false;
        state.requestError = action.error.message;
      })
      .addCase(createOtp.fulfilled, (state) => {
        state.loading = false;
        state.requestError = '';
      });
  },
  selectors: {},
});

export const userReducer = userSlice.reducer;
export const { setUser, authChecked, setAuthorized, resetUser } =
  userSlice.actions;
export const userSelector = userSlice.selectors;
