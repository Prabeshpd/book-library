import { AxiosError } from 'axios';
import { ActionReducerMapBuilder, AsyncThunkPayloadCreator, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import * as userBooksAdapter from '@/adapters/userBooks';
import { PageQueryParams } from '@/types/query';
import { FetchUserBooksResponse } from '@/types/userBooks';

import { UserBookState } from './userBooks';

export const FETCH_USER_BOOKS_ACTION = 'fetch/userBooks';
export type FETCH_USER_BOOKS_ACTION = typeof FETCH_USER_BOOKS_ACTION;

interface UserBooksRequest {
  paginationParams: PageQueryParams;
  userId: string;
}

export const fetchUserBooksAction: AsyncThunkPayloadCreator<FetchUserBooksResponse, UserBooksRequest, any> = async (
  params: UserBooksRequest,
  { rejectWithValue },
) => {
  try {
    const { paginationParams, userId } = params;
    const response = (await userBooksAdapter.fetchUserBooks(
      paginationParams,
      userId,
    )) as unknown as FetchUserBooksResponse;

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

export const fetchUserBooks = createAsyncThunk(FETCH_USER_BOOKS_ACTION, fetchUserBooksAction);

export const extraReducers: (builder: ActionReducerMapBuilder<UserBookState>) => void = (builder) => {
  builder.addCase(fetchUserBooks.fulfilled, (state: UserBookState, action: PayloadAction<FetchUserBooksResponse>) => {
    state.isLoadingFetchUserBooks = false;
    state.userBooks = action.payload.data;
    state.meta = action.payload.meta;
  });

  builder.addCase(fetchUserBooks.rejected, (state: UserBookState) => {
    state.isLoadingFetchUserBooks = false;
  });

  builder.addCase(fetchUserBooks.pending, (state: UserBookState) => {
    state.isLoadingFetchUserBooks = true;
  });
};
