import * as qs from 'qs';

export function parse<T>(queryString: string) {
  if (queryString.substr(0, 1) === '?') {
    queryString = queryString.substr(1);
  }

  return qs.parse(queryString);
}

export function stringify(queryParams: any, prefix: string = '?'): string {
  const queryString = qs.stringify(queryParams);

  return `${prefix}${queryString}`;
}

export function stringifySortParams(sortParams: any) {
  return qs.stringify(
    { _sort: Object.keys(sortParams), _order: Object.values(sortParams) },
    { arrayFormat: 'comma', encode: false },
  );
}
