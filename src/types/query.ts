export interface BooksFilter {
  queryInput?: string | null;
  category?: string;
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
