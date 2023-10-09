import { BookActions } from '@/actions/index';
import {
  FETCH_BOOKS_FULFILLED,
  FETCH_BOOKS_PENDING,
  FETCH_BOOKS_REJECTED,
  FETCH_BOOK_DETAIL_FULFILLED,
  FETCH_BOOK_DETAIL_PENDING,
  FETCH_BOOK_DETAIL_REJECTED,
} from '@/actions/books';

import BookState from '@/types/states/ui/books';

export const INITIAL_STATE: BookState = {
  isLoadingFetchBooks: false,
  isLoadingFetchBookDetail: false,
  isLoadingBorrowBooks: false,
};

export default function books(state: BookState = INITIAL_STATE, action: BookActions): BookState {
  switch (action.type) {
    case FETCH_BOOKS_PENDING:
      return {
        ...state,
        isLoadingFetchBooks: true,
      };

    case FETCH_BOOKS_FULFILLED:
    case FETCH_BOOKS_REJECTED:
      return {
        ...state,
        isLoadingFetchBooks: false,
      };

    case FETCH_BOOK_DETAIL_PENDING:
      return {
        ...state,
        isLoadingFetchBookDetail: true,
      };

    case FETCH_BOOK_DETAIL_FULFILLED:
    case FETCH_BOOK_DETAIL_REJECTED:
      return { ...state, isLoadingFetchBookDetail: false };

    default:
      return state;
  }
}
