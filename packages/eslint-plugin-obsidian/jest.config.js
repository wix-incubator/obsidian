/** @type {import('jest').Config} */
const config = {
  resetMocks: true,
  resetModules: true,
  roots: [
    'rules',
    'node_modules',
  ],
  testEnvironment: 'jsdom',
};

module.exports = config;
