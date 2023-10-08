import config from '@/config/config';
import http from '@/lib/requestManager/requestManager';
import * as qs from '@/lib/queryString';
import { PageQueryParams } from '@/types/query';

export async function getResults(pageParams: PageQueryParams) {
  const queryString = (pageParams && qs.stringify(pageParams)) || '';
  const url = config.endpoints.fetchBooks + queryString;
  const { data } = await http.get(url);

  return data;
}
