import Users from './users';
import Books from './books';

interface DataState {
  readonly users: Users;
  readonly books: Books;
}

export default DataState;
