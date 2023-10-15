interface AuthToken {
  accessToken: string;
}

export const authTokenKey = 'Authentication';

export const getToken = (): AuthToken | undefined => {
  const jsonAuthTokens = localStorage.getItem(authTokenKey);
  if (!jsonAuthTokens) {
    return;
  }

  const tokens: AuthToken = JSON.parse(jsonAuthTokens);

  return tokens;
};

export const setToken = (accessToken: string): void => {
  const tokens: AuthToken = {
    accessToken,
  };
  localStorage.setItem(authTokenKey, JSON.stringify(tokens));
};

export const clearToken = (): void => {
  localStorage.removeItem(authTokenKey);
};
