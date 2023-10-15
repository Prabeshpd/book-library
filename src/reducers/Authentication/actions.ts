import { AxiosError } from 'axios';
import { ActionReducerMapBuilder, AsyncThunkPayloadCreator, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import * as authAdapter from 'src/adapters/authentication';

import { AuthState } from './authentication';
import { clearToken } from '@/helpers/authentication';
import { LoginRequest, LoginResponse } from '@/types/auth';

import { userActions } from '../User/users';

export const LOGIN_ACTION = 'login/user';
export type LOGIN_ACTION = typeof LOGIN_ACTION;

export const loginAction: AsyncThunkPayloadCreator<LoginResponse, LoginRequest, any> = async (
  payload: LoginRequest,
  { rejectWithValue, dispatch },
) => {
  try {
    const loginResponse = (await authAdapter.login(payload)) as unknown as LoginResponse;
    dispatch(userActions.setUser(loginResponse.user));

    return loginResponse;
  } catch (error: any) {
    const axiosError = error as unknown as AxiosError;

    if (!axiosError.response) {
      throw error;
    }

    const { data, status } = axiosError.response;

    return rejectWithValue({ data, status });
  }
};

export const login = createAsyncThunk(LOGIN_ACTION, loginAction);

export const extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => void = (builder) => {
  builder.addCase(login.fulfilled, (state: AuthState, action: PayloadAction<LoginResponse>) => {
    state.isLoadingLogin = false;
    state.accessToken = action.payload.accessToken;
    state.isLoggedIn = true;
  });

  builder.addCase(login.rejected, (state: AuthState) => {
    state.isLoadingLogin = false;
    state.isLoggedIn = false;
  });

  builder.addCase(login.pending, (state: AuthState) => {
    state.isLoadingLogin = true;
  });
};

export const authReducers = {
  logout: (state: AuthState): void => {
    state.accessToken = '';
    state.isLoggedIn = false;
    clearToken();
  },
};
