import { UserBooksActions } from '@/actions/index';
import UserBookState from '@/types/states/data/userBooks';
import { FETCH_USER_BOOKS_FULFILLED } from '@/actions/userBooks';

export const INITIAL_STATE: UserBookState = {
  userBooks: [],
  meta: {
    limit: 0,
    currentPage: 0,
    totalCounts: 0,
  },
};

export default function (state: UserBookState = INITIAL_STATE, action: UserBooksActions): UserBookState {
  switch (action.type) {
    case FETCH_USER_BOOKS_FULFILLED: {
      return {
        ...state,
        userBooks: action.payload.data,
        meta: { ...state.meta, ...action.payload.metadata },
      };
    }

    default:
      return state;
  }
}
