import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../../services/types';
import { signIn } from './actions';

type TUsersState = {
  user: TUser;
  loading: boolean;
  requestError?: string;
  isAuthChecked: boolean;
  authorized: boolean;
};

export const initialState: TUsersState = {
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
  },
  selectors: {},
});

export const userReducer = userSlice.reducer;
export const { setUser, authChecked, setAuthorized, resetUser } =
  userSlice.actions;
