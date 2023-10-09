interface User {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly isLoggedIn: boolean;
  user: {
    readonly id: string;
    readonly email: string;
    readonly name: string;
  };
}

export default User;
