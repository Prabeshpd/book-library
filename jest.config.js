module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/jest.ts'],
  testMatch: ['<rootDir>/src/**/*.test.tsx'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/mock/fileMock.ts',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/context/(.*)$': '<rootDir>/src/context/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/config/(.*)$': '<rootDir>/src/config/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/services/(.*)$': '<rootDir>/src/services/$1',
    '^@/constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@/actions/(.*)$': '<rootDir>/src/actions/$1',
    '^@/reducers/(.*)$': '<rootDir>/src/reducers/$1',
    '^@/helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@/presenters/(.*)$': '<rootDir>/src/presenters/$1',
    '^@/adapters/(.*)$': '<rootDir>/src/adapters/$1',
  },
  transform: {
    '\\.(js|jsx)$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/fileTransformer.js',
  },
};
