/** @type {import('jest').Config} */
const config = {
  resetMocks: true,
  resetModules: true,
  roots: [
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
transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', { configFile: './babel.config.legacy.js' }],
  }
}

module.exports = config;
