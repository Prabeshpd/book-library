import { AuthActions } from '@/actions/index';
import { FETCH_USER_FULFILLED, FETCH_USER_REJECTED, FETCH_USER_PENDING } from '@/actions/users';

import UserState from '@/types/states/ui/users';

export const INITIAL_STATE: UserState = {
  isLoadingFetchUser: false,
};

export default function users(state: UserState = INITIAL_STATE, action: AuthActions): UserState {
  switch (action.type) {
    case FETCH_USER_PENDING:
      return {
        ...state,
        isLoadingFetchUser: true,
      };

    case FETCH_USER_FULFILLED:
    case FETCH_USER_REJECTED:
      return {
        ...state,
        isLoadingFetchUser: false,
      };

    default:
      return state;
  }
}
