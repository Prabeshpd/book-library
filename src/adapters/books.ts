import config from '@/config/config';

import { get } from './base';
import { QueryParams } from '@/types/query';

export const fetchBooks = (queryParams: QueryParams) => get(config.endpoints.fetchBooks, queryParams);

export const fetchBookDetail = (id: string) => get(config.endpoints.fetchBookDetail, { id });
