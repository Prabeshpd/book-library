import User from './users';
import Books from './books';

interface DataState {
  readonly user: User;
  readonly books: Books;
}

export default DataState;
