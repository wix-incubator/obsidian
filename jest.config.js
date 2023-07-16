const config = {
  resetMocks: true,
  resetModules: true,
  roots: [
    'node_modules',
    'src',
    'transformers',
    'test',
  ],
  setupFilesAfterEnv: [
    './jest.setup-after-env.js',
    'jest-extended/all'
  ],
  testEnvironment: 'jsdom'
};

module.exports = config;
