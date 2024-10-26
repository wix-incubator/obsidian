/** @type {import('jest').Config} */
const config = {
  resetMocks: true,
  resetModules: true,
  roots: ['src'],
  setupFilesAfterEnv: [
    'jest-extended/all'
  ],
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ["json-summary", "text"],
  collectCoverageFrom: [
    'src/**/*.{ts}',
    '!dist/**',
  ],
};

module.exports = config;
