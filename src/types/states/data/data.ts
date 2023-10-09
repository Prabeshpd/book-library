import Users from './users';
import Books from './books';
import UserBooks from './userBooks';

interface DataState {
  readonly users: Users;
  readonly books: Books;
  readonly userBooks: UserBooks;
}

export default DataState;
