import { useReducer, useEffect } from 'react';

import { PAGINATION_CURRENT_PAGE, PAGINATION_LIMIT } from '@/constants/constants';
import toast from '@/lib/toast';
import { BooksFilter, BooksSort, QueryParams } from '@/types/query';

interface tableState {
  pageNumber: 1;
  filterParams: BooksFilter;
  sortParams: BooksSort;
}

interface Action<T, P = {}> {
  type: T;
  payload: P;
}

const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER';
type SET_PAGE_NUMBER = typeof SET_PAGE_NUMBER;

const SET_FILTER_PARAMS = 'SET_FILTER_PARAMS';
type SET_FILTER_PARAMS = typeof SET_FILTER_PARAMS;

const SET_SORT_PARAMS = 'SET_SORT_PARAMS';
type SET_SORT_PARAMS = typeof SET_SORT_PARAMS;

type setPageNumber = Action<SET_PAGE_NUMBER, number>;
type setFilterParams = Action<SET_FILTER_PARAMS, BooksFilter>;
type setSortParams = Action<SET_SORT_PARAMS, BooksSort>;
type tableActions = setPageNumber | setFilterParams | setSortParams;

interface Actions {
  fetchBooks: (queryParams: QueryParams) => void;
}

export function useListBooks(actions: Actions) {
  const { fetchBooks } = actions;
  let [state, dispatch] = useReducer(
    (state: tableState, action: tableActions) => {
      switch (action.type) {
        case SET_PAGE_NUMBER:
          return {
            ...state,
            pageNumber: action.payload,
          };
        case SET_FILTER_PARAMS:
          return { ...state, filterParams: action.payload };

        case SET_SORT_PARAMS:
          return { ...state, sortParams: action.payload };

        default:
          return { pageNumber: PAGINATION_CURRENT_PAGE, filterParams: {}, sortParams: {} };
      }
    },
    {
      pageNumber: PAGINATION_CURRENT_PAGE,
      filterParams: {},
      sortParams: {},
    },
  );

  const getQueryParams = () => {
    const { filterParams, sortParams } = state;

    return {
      paginationQueryParams: { _limit: PAGINATION_LIMIT, _page: state.pageNumber },
      filterQueryParams: filterParams,
      sortQueryParams: sortParams,
    };
  };

  const listBooks = async (queryParams: QueryParams) => {
    try {
      await fetchBooks(queryParams);
    } catch (err: any) {
      toast('Unable to fetch the list of keywords.', 'error');
    }
  };

  const onApplyFilter = async (filterParameters: BooksFilter) => {
    dispatch({ type: SET_FILTER_PARAMS, payload: filterParameters });
    const queryParams = getQueryParams();

    await listBooks({ ...queryParams, filterQueryParams: filterParameters });
  };

  const resetFilter = async () => {
    dispatch({ type: SET_FILTER_PARAMS, payload: {} });
    const queryParams = getQueryParams();

    await listBooks({ ...queryParams, filterQueryParams: {} });
  };

  useEffect(() => {
    const queryParams = getQueryParams();
    console.log({ queryParams });

    listBooks(queryParams);
  }, [state.pageNumber, state.sortParams]);

  return { state, dispatch, resetFilter, onApplyFilter };
}
