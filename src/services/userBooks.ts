import config from '@/config/config';
import http from '@/lib/requestManager/requestManager';
import * as qs from '@/lib/queryString';
import { formatDataForReducer } from '@/presenters/listPresenters';
import { PageQueryParams } from '@/types/query';

export async function borrowBooks(userId: string, bookId: string) {
  const url = config.endpoints.borrowBooks;
  const { data } = await http.post(url, { userId, bookId });

  return data;
}

export async function fetchUserBooks(userId: string, paginationParams: PageQueryParams) {
  const queryString = `?_expand=book&${qs.stringify(paginationParams, { hasPrefix: false })}&userId=${userId}`;
  const url = config.endpoints.userBooks + queryString;

  const { data } = await http.get(url);

  return formatDataForReducer(data);
}
