import { AxiosError } from 'axios';
import { ActionReducerMapBuilder, AsyncThunkPayloadCreator, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import * as booksAdapter from '@/adapters/books';
import { QueryParams } from '@/types/query';
import { FetchBooksResponse, Books } from '@/types/books';

import { BookState } from './books';

export const FETCH_BOOKS_ACTION = 'fetch/books';
export type FETCH_BOOKS_ACTION = typeof FETCH_BOOKS_ACTION;

export const FETCH_BOOK_DETAIL = 'fetch/bookDetail';
export type FETCH_BOOK_DETAIL = typeof FETCH_BOOK_DETAIL;

export const fetchBooksAction: AsyncThunkPayloadCreator<FetchBooksResponse, QueryParams, any> = async (
  queryParams: QueryParams,
  { rejectWithValue },
) => {
  try {
    const response = (await booksAdapter.fetchBooks(queryParams)) as unknown as FetchBooksResponse;

    return response;
  } catch (error: any) {
    const axiosError = error as unknown as AxiosError;

    if (!axiosError.response) {
      throw error;
    }

    const { data, status } = axiosError.response;

    return rejectWithValue({ data, status });
  }
};

export const fetchBooks = createAsyncThunk(FETCH_BOOKS_ACTION, fetchBooksAction);

export const fetchBookDetailAction: AsyncThunkPayloadCreator<Books, string, any> = async (
  id: string,
  { rejectWithValue },
) => {
  try {
    const response = (await booksAdapter.fetchBookDetail(id)) as unknown as Books;

    return response;
  } catch (error: any) {
    const axiosError = error as unknown as AxiosError;

    if (!axiosError.response) {
      throw error;
    }

    const { data, status } = axiosError.response;

    return rejectWithValue({ data, status });
  }
};

export const fetchBookDetail = createAsyncThunk(FETCH_BOOK_DETAIL, fetchBookDetailAction);

export const extraReducers: (builder: ActionReducerMapBuilder<BookState>) => void = (builder) => {
  builder.addCase(fetchBooks.fulfilled, (state: BookState, action: PayloadAction<FetchBooksResponse>) => {
    state.isLoadingFetchBooks = false;
    state.books = action.payload.data;
    state.meta = action.payload.meta;
  });

  builder.addCase(fetchBooks.rejected, (state: BookState) => {
    state.isLoadingFetchBooks = false;
  });

  builder.addCase(fetchBooks.pending, (state: BookState) => {
    state.isLoadingFetchBooks = true;
  });

  builder.addCase(fetchBookDetail.fulfilled, (state: BookState, action: PayloadAction<Books>) => {
    state.isLoadingFetchBookDetail = false;
    state.book = action.payload;
  });

  builder.addCase(fetchBookDetail.rejected, (state: BookState) => {
    state.isLoadingFetchBookDetail = false;
  });

  builder.addCase(fetchBookDetail.pending, (state: BookState) => {
    state.isLoadingFetchBookDetail = true;
  });
};
