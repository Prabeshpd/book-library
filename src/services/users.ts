import config from '../config/config';
import http from '../lib/requestManager/requestManager';

import { RegisterPayload } from '../types/auth';

export async function createUser(payload: RegisterPayload) {
  const url = config.endpoints.createUser;
  const { data } = await http.post(url, payload);

  return data;
}
