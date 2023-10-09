import { LoginActions } from './login';
import { LogoutActions } from './logout';
import { FetchBooksActions, FetchBookDetailActions } from './books';
import { FetchUserActions } from './users';
import { FetchUserBooksActions } from './userBooks';

export type AuthActions = LoginActions | LogoutActions | FetchUserActions;
export type BookActions = FetchBooksActions | FetchBookDetailActions;
export type UserBooksActions = FetchUserBooksActions;
