import config from '@/config/config';
import * as qs from '@/lib/queryString';
import { PageQueryParams } from '@/types/query';
import { UserBooksPayload } from '@/types/userBooks';

import { get, post } from './base';

export const fetchUserBooks = (paginationParams: PageQueryParams, userId: string) => {
  const queryString = `?_expand=book&${qs.stringify(paginationParams, { hasPrefix: false })}&userId=${userId}`;
  const url = config.endpoints.userBooks + queryString;

  return get(url);
};

export const borrowBooks = (payload: UserBooksPayload) => post(config.endpoints.borrowBooks, payload);
