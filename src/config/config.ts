export interface Config {
  nodeEnv?: string;
  env?: string;
  baseURI: string;
  endpoints: {
    login: string;
    createUser: string;
    fetchBooks: string;
    fetchBookDetail: string;
  };
}

const config: Config = {
  nodeEnv: process.env.NODE_ENV,
  env: process.env.REACT_APP_ENV || 'dev',
  baseURI: process.env.REACT_BASE_API_URL || 'http://localhost:3000',
  endpoints: {
    // login
    login: '/login',

    // user
    createUser: '/users',

    // books
    fetchBooks: '/books',
    fetchBookDetail: '/books/:id',
  },
};

export default config;
