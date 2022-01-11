const originalConfig = require('./jest.config');

module.exports = {
  ...originalConfig,
  roots: [
    ...originalConfig.roots,
    'dist'
  ],
}
