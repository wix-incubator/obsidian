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
    '<rootDir>/node_modules/setimmediate/setimmediate.js'
  ],
  testEnvironment: 'jsdom'
};

module.exports = config;
