export interface Config {
  nodeEnv?: string;
  env?: string;
  baseURI: string;
  endpoints: {
    login: string;
    createUser: string;
    fetchBooks: string;
    fetchBookDetail: string;
    fetchUser: string;
    borrowBooks: string;
  };
}

const config: Config = {
  nodeEnv: process.env.NODE_ENV,
  env: process.env.REACT_APP_ENV || 'dev',
  baseURI: process.env.REACT_BASE_API_URL || 'http://localhost:3000',
  endpoints: {
    // user
    fetchUser: '/me',

    // login
    login: '/login',

    // user
    createUser: '/users',

    // books
    fetchBooks: '/books',
    fetchBookDetail: '/books/:id',
    borrowBooks: '/users/:id',
  },
};

export default config;
