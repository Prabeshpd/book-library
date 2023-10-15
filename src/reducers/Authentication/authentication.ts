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
  name: 'authentication',
  initialState,
  reducers: authReducers,
  extraReducers: extraReducers,
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
