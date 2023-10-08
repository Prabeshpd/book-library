import { BookActions } from '@/actions/index';
import BookState from '@/types/states/data/books';
import { FETCH_BOOKS_FULFILLED } from '@/actions/books';

export const INITIAL_STATE: BookState = {
  books: [],
  meta: {
    perPage: 0,
    currentPage: 0,
    totalCount: 0,
  },
};

export default function (state: BookState = INITIAL_STATE, action: BookActions): BookState {
  switch (action.type) {
    case FETCH_BOOKS_FULFILLED: {
      return {
        ...state,
        books: action.payload.data,
        meta: { ...state.meta, ...action.payload.metadata },
      };
    }

    default:
      return state;
  }
}
