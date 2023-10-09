import { UserBooksActions } from '@/actions/index';
import { FETCH_USER_BOOKS_FULFILLED, FETCH_USER_BOOKS_PENDING, FETCH_USER_BOOKS_REJECTED } from '@/actions/userBooks';

import UserBookState from '@/types/states/ui/userBooks';

export const INITIAL_STATE: UserBookState = {
  isLoadingFetchUserBooks: false,
};

export default function userBooks(state: UserBookState = INITIAL_STATE, action: UserBooksActions): UserBookState {
  switch (action.type) {
    case FETCH_USER_BOOKS_PENDING:
      return {
        ...state,
        isLoadingFetchUserBooks: true,
      };

    case FETCH_USER_BOOKS_FULFILLED:
    case FETCH_USER_BOOKS_REJECTED:
      return {
        ...state,
        isLoadingFetchUserBooks: false,
      };

    default:
      return state;
  }
}
