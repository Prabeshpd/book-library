import { defineConfig } from 'cypress';
import resetFirebaseServices from './test/helpers/resetFirebase';
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
      on('after:run', () => {
        resetFirebaseServices();
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
