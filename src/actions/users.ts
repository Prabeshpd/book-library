import { createAction } from 'redux-actions';

import * as userService from '@/services/users';
import { Error, AxiosError } from '@/types/error';
import { Action, ActionWithError, ActionWithPayload } from '@/types/actions';
import User from '@/types/user';

export const FETCH_USER = 'FETCH_USER';
export type FETCH_USER = typeof FETCH_USER;

export const FETCH_USER_PENDING = 'FETCH_USER_PENDING';
export type FETCH_USER_PENDING = typeof FETCH_USER_PENDING;

export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';
export type FETCH_USER_FULFILLED = typeof FETCH_USER_FULFILLED;

export const FETCH_USER_REJECTED = 'FETCH_USER_REJECTED';
export type FETCH_USER_REJECTED = typeof FETCH_USER_REJECTED;

export type FetchUserPending = Action<FETCH_USER_PENDING>;
export type FetchUserFulfilled = ActionWithPayload<FETCH_USER_FULFILLED, User>;
export type FetchUserRejected = ActionWithError<FETCH_USER_REJECTED, AxiosError<Error>>;

export type FetchUserActions = FetchUserPending | FetchUserFulfilled | FetchUserRejected;

export const fetchUser = createAction(FETCH_USER, userService.fetchUser);
