import { PaginationMeta } from './query';

export interface Books {
  id: string;
  title: string;
  imageUrl: string;
  addedAt: string;
  burrowedNumber: number;
  description: string;
  category: string;
  userBooks: { userId: string; bookId: string }[];
}

export interface FetchBooksResponse {
  books: Books[];
  meta: PaginationMeta;
}
