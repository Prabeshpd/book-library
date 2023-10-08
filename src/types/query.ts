import { Categories } from '@/constants/enums';

export interface BooksFilter {
  queryInput?: string | null;
  category?: Categories;
}

type Sort = 'Ascending' | 'Descending';

export interface BooksSort {
  addedAt: Sort;
  burrowedNumber: Sort;
}

export interface PaginationMeta {
  limit: number;
  totalCounts: number;
  currentPage: number;
}

export interface PageQueryParams {
  currentPage: number;
  maxRows: Number;
}
