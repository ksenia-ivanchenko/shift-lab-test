import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices';

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
