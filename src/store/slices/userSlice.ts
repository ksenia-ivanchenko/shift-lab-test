import { createSlice } from '@reduxjs/toolkit';

type TUsersState = { phone: string };

const initialState: TUsersState = { phone: '' };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {},
});

export const {} = userSlice.actions;
export const userSelector = userSlice.selectors;
