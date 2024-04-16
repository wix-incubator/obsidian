/** @type {import('jest').Config} */
const config = {
  resetMocks: true,
  resetModules: true,
  roots: [
    'node_modules',
    'src',
    'transformers',
    'test'
  ],
  setupFilesAfterEnv: [
    './jest.setup-after-env.js',
    'jest-extended/all'
  ],
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  coverageReporters: ["json-summary", "text"],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!dist/**',
  ],
};

module.exports = config;
