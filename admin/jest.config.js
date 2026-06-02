/* eslint-env node */
const nextJest = require('next/jest');

const createJestConfig = nextJest({dir: './'});



module.exports = createJestConfig({
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^next$': require.resolve('next'),
    '^next/navigation$': require.resolve('next/navigation')
  },
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  testEnvironment: 'jsdom',
  rootDir: 'src',
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+(test|spec).ts?(x)']
});
