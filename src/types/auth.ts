import User from './user';

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LogoutResponse {
  code: number;
  message: string | null;
}
