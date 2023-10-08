import config from '@/config/config';
import { isEmpty } from '@/helpers/object';
import http from '@/lib/requestManager/requestManager';
import * as qs from '@/lib/queryString';
import { QueryParams } from '@/types/query';

export async function fetchBooks(queryParams: QueryParams) {
  const { paginationQueryParams, filterQueryParams, sortQueryParams } = queryParams;
  let queryString = qs.stringify(paginationQueryParams);

  if (!isEmpty(filterQueryParams)) {
    queryString += `&${qs.stringify(filterQueryParams)}`;
  }

  if (!isEmpty(sortQueryParams)) {
    queryString += `&${qs.stringifySortParams(sortQueryParams)}`;
  }

  const url = config.endpoints.fetchBooks + queryString;
  const { data } = await http.get(url);

  return data;
}
