import { Books } from './books';

export interface UserBook {
  id: string;
  book: Books;
  userId: string;
}
