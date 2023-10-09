import pinterpolate from 'pinterpolate';

import config from '@/config/config';
import { isEmpty, filterNotNullValues } from '@/helpers/object';
import http from '@/lib/requestManager/requestManager';
import * as qs from '@/lib/queryString';
import { formatDataForReducer } from '@/presenters/listPresenters';
import { QueryParams } from '@/types/query';

export async function fetchBooks(queryParams: QueryParams) {
  const { paginationQueryParams, filterQueryParams, sortQueryParams } = queryParams;
  let queryString = qs.stringify(paginationQueryParams);

  if (!isEmpty(filterQueryParams)) {
    const filterParams = filterNotNullValues(filterQueryParams);
    queryString += `&${qs.stringify(filterParams, { hasPrefix: false })}`;
  }

  if (!isEmpty(sortQueryParams)) {
    const sortParams = filterNotNullValues(sortQueryParams);
    queryString += `&${qs.stringifySortParams(sortParams)}`;
  }

  const url = config.endpoints.fetchBooks + queryString;
  const { data } = await http.get(url);

  return formatDataForReducer(data);
}

export async function fetchBookDetail(id: string) {
  const url = pinterpolate(config.endpoints.fetchBookDetail, { id }) + '?_embed=userBooks';
  const { data } = await http.get(url);

  return data;
}
