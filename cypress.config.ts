import { defineConfig } from 'cypress';
import resetServer from './test/helpers/resetServer';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    env: {
      BASE_API_URL: 'http://localhost:3000',
    },
    setupNodeEvents(on, _config) {
      on('task', {
        async resetServerDatabase() {
          return resetServer();
        },
      });
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
