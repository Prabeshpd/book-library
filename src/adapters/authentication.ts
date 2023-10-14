import config from '@/config/config';

import { post } from './base';
import { LoginRequest } from '@/types/auth';

export const login = (loginPayload: LoginRequest) => post(config.endpoints.login, loginPayload);
