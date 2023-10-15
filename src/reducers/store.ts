import { configureStore } from '@reduxjs/toolkit';

import users from './User/users';
import books from './Books/books';
import authentication from './Authentication/authentication';
import userBooks from './UserBooks/userBooks';

const reducers = {
  users,
  books,
  authentication,
  userBooks,
};

export const store = configureStore({
  reducer: reducers,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
