import { createAction } from 'redux-actions';

import * as authService from '@/services/auth';
import { Action, ActionWithError, ActionWithPayload } from '@/types/actions';
import { Error, AxiosError } from '@/types/error';
import { LoginResponse } from '@/types/login';

export const LOGIN_USER = 'LOGIN_USER';
export type LOGIN_USER = typeof LOGIN_USER;

export const LOGIN_USER_PENDING = 'LOGIN_USER_PENDING';
export type LOGIN_USER_PENDING = typeof LOGIN_USER_PENDING;

export const LOGIN_USER_REJECTED = 'LOGIN_USER_REJECTED';
export type LOGIN_USER_REJECTED = typeof LOGIN_USER_REJECTED;

export const LOGIN_USER_FULFILLED = 'LOGIN_USER_FULFILLED';
export type LOGIN_USER_FULFILLED = typeof LOGIN_USER_FULFILLED;

export type LoginUserPending = Action<LOGIN_USER_PENDING>;
export type LoginUserFulfilled = ActionWithPayload<LOGIN_USER_FULFILLED, LoginResponse>;
export type LoginUserRejected = ActionWithError<LOGIN_USER_REJECTED, AxiosError<Error>>;

export type LoginActions = LoginUserPending | LoginUserFulfilled | LoginUserRejected;

export const loginUser = createAction(LOGIN_USER, authService.login);
