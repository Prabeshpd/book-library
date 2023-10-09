import { createAction } from 'redux-actions';

import { Action, ActionWithError, ActionWithPayload } from '@/types/actions';
import { UserBook } from '@/types/userBooks';
import { Error, AxiosError } from '@/types/error';
import { PaginationMeta } from '@/types/query';
import * as userBooksService from '@/services/userBooks';

export const FETCH_USER_BOOKS = 'FETCH_USER_BOOKS';
export type FETCH_USER_BOOKS = typeof FETCH_USER_BOOKS;

export const FETCH_USER_BOOKS_PENDING = 'FETCH_USER_BOOKS_PENDING';
export type FETCH_USER_BOOKS_PENDING = typeof FETCH_USER_BOOKS_PENDING;

export const FETCH_USER_BOOKS_REJECTED = 'FETCH_USER_BOOKS_REJECTED';
export type FETCH_USER_BOOKS_REJECTED = typeof FETCH_USER_BOOKS_REJECTED;

export const FETCH_USER_BOOKS_FULFILLED = 'FETCH_USER_BOOKS_FULFILLED';
export type FETCH_USER_BOOKS_FULFILLED = typeof FETCH_USER_BOOKS_FULFILLED;

export type FetchUserBooksPending = Action<FETCH_USER_BOOKS_PENDING>;
export type FetchUserBooksFulfilled = ActionWithPayload<
  FETCH_USER_BOOKS_FULFILLED,
  { data: UserBook[]; metadata: PaginationMeta }
>;
export type FetchUserBooksRejected = ActionWithError<FETCH_USER_BOOKS_REJECTED, AxiosError<Error>>;

export type FetchUserBooksActions = FetchUserBooksPending | FetchUserBooksFulfilled | FetchUserBooksRejected;

export const fetchUserBooks = createAction(FETCH_USER_BOOKS, userBooksService.fetchUserBooks);
