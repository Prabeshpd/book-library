import config from '@/config/config';
import * as qs from '@/lib/queryString';
import { formatDataForReducer } from '@/presenters/listPresenters';
import { PageQueryParams } from '@/types/query';
import { UserBooksPayload } from '@/types/userBooks';

import { get, post } from './base';

export const fetchUserBooks = async (paginationParams: PageQueryParams, userId: string) => {
  const queryString = `?_expand=book&${qs.stringify(paginationParams, { hasPrefix: false })}&userId=${userId}`;
  const url = config.endpoints.userBooks + queryString;
  const data = (await get(url)) as unknown as any[];

  return formatDataForReducer(data);
};

export const borrowBooks = (payload: UserBooksPayload) => post(config.endpoints.borrowBooks, payload);
