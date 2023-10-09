import pinterpolate from 'pinterpolate';
import config from '../config/config';
import http from '../lib/requestManager/requestManager';

import { RegisterPayload } from '../types/auth';

export async function createUser(payload: RegisterPayload) {
  const url = config.endpoints.createUser;
  const { data } = await http.post(url, payload);

  return data;
}

export async function fetchUser(id: string) {
  const url = pinterpolate(config.endpoints.fetchUser, { id });
  const { data } = await http.get(url);

  return data;
}
