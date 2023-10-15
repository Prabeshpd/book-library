import config from '@/config/config';
import { RegisterPayload } from '@/types/auth';

import { get, post } from './base';

export const fetchUser = (id: string) => get(config.endpoints.fetchUser, { id });

export const createUser = async (payload: RegisterPayload) => post(config.endpoints.createUser, payload);
