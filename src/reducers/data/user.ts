import { AuthActions } from '@/actions/index';
import { LOGIN_USER_REJECTED, LOGIN_USER_FULFILLED } from '@/actions/login';
import { LOGOUT_FULFILLED } from '@/actions/logout';
import User from '@/types/states/data/user';

export const INITIAL_STATE: User = {
  accessToken: '',
  refreshToken: '',
  error: {
    code: '',
    message: '',
  },
  isLoggedIn: false,
  user: {
    email: '',
    name: '',
    id: 0,
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

    case LOGIN_USER_REJECTED:
      return {
        ...state,
        error: {
          code: action.payload?.response?.data.code,
          message: action.payload?.response?.data.message,
        },
      };

    case LOGOUT_FULFILLED:
      return INITIAL_STATE;

    default:
      return state;
  }
}
