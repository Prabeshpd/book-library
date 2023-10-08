import { BookActions } from '@/actions/index';
import BookState from '@/types/states/data/books';
import { FETCH_BOOKS_FULFILLED, FETCH_BOOK_DETAIL_FULFILLED } from '@/actions/books';

export const INITIAL_STATE: BookState = {
  books: [],
  bookDetail: {
    id: '',
    title: '',
    description: '',
    addedAt: '',
    category: '',
    imageUrl: '',
    burrowedNumber: 0,
  },
  meta: {
    limit: 0,
    currentPage: 0,
    totalCounts: 0,
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

    case FETCH_BOOK_DETAIL_FULFILLED: {
      return {
        ...state,
        bookDetail: action.payload,
      };
    }

    default:
      return state;
  }
}
