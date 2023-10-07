import { LoginActions } from './login';
import { LogoutActions } from './logout';

export type AuthActions = LoginActions | LogoutActions;
