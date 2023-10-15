import pinterpolate from 'pinterpolate';

import config from '@/config/config';
import * as qs from '@/lib/queryString';
import { isEmpty, filterNotNullValues } from '@/helpers/object';
import { QueryParams } from '@/types/query';

import { get } from './base';

export const fetchBooks = (queryParams: QueryParams) => {
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

  return get(url);
};

export const fetchBookDetail = (id: string) => {
  const url = pinterpolate(config.endpoints.fetchBookDetail, { id }) + '?_embed=userBooks';

  return get(url);
};
