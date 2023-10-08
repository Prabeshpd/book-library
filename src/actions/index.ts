import { LoginActions } from './login';
import { LogoutActions } from './logout';
import { FetchBooksActions, FetchBookDetailActions } from './books';

export type AuthActions = LoginActions | LogoutActions;
export type BookActions = FetchBooksActions | FetchBookDetailActions;
