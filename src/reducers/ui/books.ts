import { BookActions } from '@/actions/index';
import { FETCH_BOOKS_FULFILLED, FETCH_BOOKS_PENDING, FETCH_BOOKS_REJECTED } from '@/actions/books';

import BookState from '@/types/states/ui/books';

export const INITIAL_STATE: BookState = {
  isFetchBooksFailed: false,
  isLoadingFetchBooks: false,
};

export default function login(state: BookState = INITIAL_STATE, action: BookActions): BookState {
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

    default:
      return state;
  }
}
