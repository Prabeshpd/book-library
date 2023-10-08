import { Categories } from '@/constants/enums';

export interface BooksFilter {
  title?: string;
  category?: Categories;
}

type Sort = 'Ascending' | 'Descending';

export interface BooksSort {
  addedAt?: Sort;
  burrowedNumber?: Sort;
}

export interface PaginationMeta {
  limit: number;
  totalCounts: number;
  currentPage: number;
}

export interface PageQueryParams {
  _page: number;
  _limit: Number;
}

export interface QueryParams {
  paginationQueryParams: PageQueryParams;
  filterQueryParams: BooksFilter;
  sortQueryParams: BooksSort;
}
