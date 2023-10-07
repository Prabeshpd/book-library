export interface RegisterPayload {
  email: string;
  name: string;
  password: string;
  imageUrl?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
