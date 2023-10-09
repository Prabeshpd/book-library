import pinterpolate from 'pinterpolate';

import config from '@/config/config';
import { isEmpty, filterNotNullValues } from '@/helpers/object';
import http from '@/lib/requestManager/requestManager';
import * as qs from '@/lib/queryString';
import { QueryParams } from '@/types/query';

export async function fetchBooks(queryParams: QueryParams) {
  const { paginationQueryParams, filterQueryParams, sortQueryParams } = queryParams;
  let queryString = qs.stringify(paginationQueryParams);

  if (!isEmpty(filterQueryParams)) {
    const filterParams = filterNotNullValues(filterQueryParams);
    queryString += `&${qs.stringify(filterParams, { hasPrefix: false })}`;
  }

  if (!isEmpty(sortQueryParams)) {
    queryString += `&${qs.stringifySortParams(sortQueryParams)}`;
  }

  const url = config.endpoints.fetchBooks + queryString;
  const { data } = await http.get(url);

  return formatDataForReducer(data);
}

export async function fetchBookDetail(id: string) {
  const url = pinterpolate(config.endpoints.fetchBookDetail, { id });
  const { data } = await http.get(url);

  return data;
}

const formatDataForReducer = (data: any[]) => {
  return {
    data,
    metadata: {
      limit: 10,
      totalCounts: 15,
      currentPage: 1,
    },
  };
};

export async function borrowBooks(userId: string, books: string[]) {
  const url = pinterpolate(config.endpoints.borrowBooks, { id: userId });
  const { data } = await http.put(url, { books });

  return data;
}
