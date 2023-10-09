import * as qs from 'qs';

export function parse<T>(queryString: string) {
  if (queryString.substr(0, 1) === '?') {
    queryString = queryString.substr(1);
  }

  return qs.parse(queryString);
}

interface StringifyOptions {
  hasPrefix: boolean;
  prefix?: string;
}

const stringifyOptions: StringifyOptions = {
  hasPrefix: true,
  prefix: '?',
};

export function stringify(queryParams: any, options: StringifyOptions = stringifyOptions): string {
  const { prefix, hasPrefix } = options;
  const queryString = qs.stringify(queryParams);

  return hasPrefix ? `${prefix}${queryString}` : queryString;
}

export function stringifySortParams(sortParams: any) {
  return qs.stringify(
    { _sort: Object.keys(sortParams), _order: Object.values(sortParams) },
    { arrayFormat: 'comma', encode: false },
  );
}
