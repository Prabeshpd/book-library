import { createAction } from 'redux-actions';

import { Action, ActionWithError, ActionWithPayload } from '@/types/actions';
import { Books } from '@/types/books';
import { Error, AxiosError } from '@/types/error';
import { PaginationMeta } from '@/types/query';
import * as booksService from '@/services/books';

export const FETCH_BOOKS = 'FETCH_BOOKS';
export type FETCH_BOOKS = typeof FETCH_BOOKS;

export const FETCH_BOOK_DETAIL = 'FETCH_BOOK_DETAIL';
export type FETCH_BOOK_DETAIL = typeof FETCH_BOOK_DETAIL;

export const FETCH_BOOKS_PENDING = 'FETCH_BOOKS_PENDING';
export type FETCH_BOOKS_PENDING = typeof FETCH_BOOKS_PENDING;

export const FETCH_BOOKS_REJECTED = 'FETCH_BOOKS_REJECTED';
export type FETCH_BOOKS_REJECTED = typeof FETCH_BOOKS_REJECTED;

export const FETCH_BOOKS_FULFILLED = 'FETCH_BOOKS_FULFILLED';
export type FETCH_BOOKS_FULFILLED = typeof FETCH_BOOKS_FULFILLED;

export const FETCH_BOOK_DETAIL_PENDING = 'FETCH_BOOK_DETAIL_PENDING';
export type FETCH_BOOK_DETAIL_PENDING = typeof FETCH_BOOK_DETAIL_PENDING;

export const FETCH_BOOK_DETAIL_REJECTED = 'FETCH_BOOK_DETAIL_REJECTED';
export type FETCH_BOOK_DETAIL_REJECTED = typeof FETCH_BOOK_DETAIL_REJECTED;

export const FETCH_BOOK_DETAIL_FULFILLED = 'FETCH_BOOK_DETAIL_FULFILLED';
export type FETCH_BOOK_DETAIL_FULFILLED = typeof FETCH_BOOK_DETAIL_FULFILLED;

export type FetchBooksPending = Action<FETCH_BOOKS_PENDING>;
export type FetchBooksFulfilled = ActionWithPayload<FETCH_BOOKS_FULFILLED, { data: Books[]; metadata: PaginationMeta }>;
export type FetchBooksRejected = ActionWithError<FETCH_BOOKS_REJECTED, AxiosError<Error>>;

export type FetchBookDetailPending = Action<FETCH_BOOK_DETAIL_PENDING>;
export type FetchBookDetailFulfilled = ActionWithPayload<FETCH_BOOK_DETAIL_FULFILLED, Books>;
export type FetchBookDetailRejected = ActionWithError<FETCH_BOOK_DETAIL_REJECTED, AxiosError<Error>>;

export type FetchBookDetailActions = FetchBookDetailPending | FetchBookDetailFulfilled | FetchBookDetailRejected;
export type FetchBooksActions = FetchBooksPending | FetchBooksFulfilled | FetchBooksRejected;

export const fetchBooks = createAction(FETCH_BOOKS, booksService.fetchBooks);
export const fetchBookDetail = createAction(FETCH_BOOK_DETAIL, booksService.fetchBookDetail);