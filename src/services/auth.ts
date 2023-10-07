import config from '@/config/config';
import http from '@/lib/requestManager/requestManager';
import { LoginRequest, LoginResponse, LogoutResponse } from '@/types/auth';

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const url = config.endpoints.login;
  const { data } = await http.post(url, payload);

  return data;
}

export async function logout(): Promise<LogoutResponse | boolean> {
  localStorage.clear();
  localStorage.removeItem('persist:root');

  return Promise.resolve(true);
}
