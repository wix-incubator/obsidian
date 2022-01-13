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
    './jest.setup-after-env.js'
  ],
  testEnvironment: 'jsdom'
};

module.exports = config;
