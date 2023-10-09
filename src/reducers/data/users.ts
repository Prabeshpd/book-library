import { AuthActions } from '@/actions/index';
import { LOGIN_USER_FULFILLED } from '@/actions/login';
import { LOGOUT_FULFILLED } from '@/actions/logout';
import { FETCH_USER_FULFILLED } from '@/actions/users';
import User from '@/types/states/data/users';

export const INITIAL_STATE: User = {
  accessToken: '',
  refreshToken: '',
  isLoggedIn: false,
  user: {
    email: '',
    name: '',
    id: '',
    imageUrl: '',
  },
};

export default function (state: User = INITIAL_STATE, action: AuthActions): User {
  switch (action.type) {
    case LOGIN_USER_FULFILLED:
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isLoggedIn: true,
      };

    case LOGOUT_FULFILLED:
      return INITIAL_STATE;

    case FETCH_USER_FULFILLED:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}
