import { createSlice } from '@reduxjs/toolkit';

import { extraReducers } from './actions';

import { Books } from '@/types/books';
import { PaginationMeta } from '@/types/query';

export interface BookState {
  books: Books[];
  meta: PaginationMeta;
  book: Books;
  isLoadingFetchBookDetail: boolean;
  isLoadingFetchBooks: boolean;
}

const initialState: BookState = {
  books: [],
  meta: {
    currentPage: 1,
    totalCounts: 0,
    limit: 10,
  },
  isLoadingFetchBookDetail: false,
  book: {
    id: '',
    title: '',
    description: '',
    addedAt: '',
    category: '',
    imageUrl: '',
    burrowedNumber: 0,
    userBooks: [],
  },
  isLoadingFetchBooks: false,
};

export const bookSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: extraReducers,
});

export const bookActions = bookSlice.actions;

export default bookSlice.reducer;
