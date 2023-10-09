import Books from './books';
import Users from './users';
import UserBooks from './userBooks';

interface UI {
  readonly users: Users;
  readonly books: Books;
  readonly userBooks: UserBooks;
}

export default UI;
