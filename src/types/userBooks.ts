import { Books } from './books';
import { PaginationMeta } from './query';

export interface UserBook {
  id: string;
  book: Books;
  userId: string;
}

export interface FetchUserBooksResponse {
  data: UserBook[];
  meta: PaginationMeta;
}

export interface UserBooksPayload {
  userId: string;
  bookId: string;
}
