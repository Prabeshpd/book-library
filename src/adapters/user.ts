import config from '@/config/config';

import { get } from './base';

export const fetchUser = (id: string) => get(config.endpoints.fetchUser, { id });
