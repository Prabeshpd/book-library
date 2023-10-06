export interface Config {
  nodeEnv?: string;
  env?: string;
  baseURI: string;
  endpoints: {
    login: string;
    createUser: string;
  };
}

const config: Config = {
  nodeEnv: process.env.NODE_ENV,
  env: process.env.REACT_APP_ENV || 'dev',
  baseURI: 'http://localhost:3000/api',
  endpoints: {
    //login
    login: '/login',

    //User
    createUser: '/users',
  },
};

export default config;
