import { createSlice } from '@reduxjs/toolkit';

import { extraReducers } from './actions';

import { UserBook } from '@/types/userBooks';
import { PaginationMeta } from '@/types/query';

export interface UserBookState {
  userBooks: UserBook[];
  meta: PaginationMeta;
  isLoadingFetchUserBooks: boolean;
}

const initialState: UserBookState = {
  userBooks: [],
  meta: {
    currentPage: 1,
    totalCounts: 0,
    limit: 10,
  },
  isLoadingFetchUserBooks: false,
};

export const userBookSlice = createSlice({
  name: 'userBooks',
  initialState,
  reducers: {},
  extraReducers: extraReducers,
});

export const userBookActions = userBookSlice.actions;

export default userBookSlice.reducer;
