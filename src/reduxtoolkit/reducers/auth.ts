import { createApi } from '@reduxjs/toolkit/query/react';

import config from '@/config/config';
import { axiosBaseQuery } from '@/lib/requestManager/axiosBaseQuery';
import User from '@/types/user';
import { LoginRequest } from '@/types/auth';
import { setToken } from '@/helpers/authentication';

interface Auth {
  user: User;
  accessToken: string;
}

export const authenticationApi = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints(builder) {
    return {
      login: builder.mutation<Auth, LoginRequest>({
        query: (payload: LoginRequest) => ({ method: 'POST', url: config.endpoints.login, params: payload }),
      }),
    };
  },
});

export const { useLoginMutation } = authenticationApi;
