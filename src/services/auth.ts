import config from '@/config/config';
import http from '@/lib/requestManager/requestManager';
import { LoginRequest, LoginResponse } from '@/types/login';

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const url = config.endpoints.login;
  const { data } = await http.post(url, payload);

  return data;
}
