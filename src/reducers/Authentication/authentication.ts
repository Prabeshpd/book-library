import { createSlice } from '@reduxjs/toolkit';

import { extraReducers, authReducers } from './actions';

export interface AuthState {
  accessToken: string;
  isLoadingLogin: boolean;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  accessToken: '',
  isLoadingLogin: false,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: authReducers,
  extraReducers: extraReducers,
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
