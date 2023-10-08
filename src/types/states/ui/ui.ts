import Books from './books';
import User from './users';

interface UI {
  readonly books: Books;
  readonly user: User;
}

export default UI;
