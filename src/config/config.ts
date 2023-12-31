export interface Config {
  nodeEnv?: string;
  env?: string;
  apiBaseUrl: string;
  apiVersion: string;
  endpoints: {
    login: string;
    createUser: string;
    fetchBooks: string;
    fetchBookDetail: string;
    fetchUser: string;
    borrowBooks: string;
    userBooks: string;
  };
}

const config: Config = {
  nodeEnv: process.env.NODE_ENV,
  env: process.env.REACT_APP_ENV || 'dev',
  apiBaseUrl: process.env.REACT_BASE_API_URL || 'http://localhost:3000',
  apiVersion: '/v1',
  endpoints: {
    // user
    fetchUser: '/users/:id',
    createUser: '/users',

    // login
    login: '/login',

    // books
    fetchBooks: '/books',
    fetchBookDetail: '/books/:id',
    borrowBooks: '/userBooks',
    userBooks: '/userBooks',
  },
};

export default config;
