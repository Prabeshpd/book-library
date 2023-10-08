interface User {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly isLoggedIn: boolean;
  user: {
    readonly id: number;
    readonly email: string;
    readonly name: string;
  };
}

export default User;
