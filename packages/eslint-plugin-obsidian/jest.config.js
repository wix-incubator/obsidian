/** @type {import('jest').Config} */
const config = {
  resetMocks: true,
  resetModules: true,
  roots: [
    'tests'
  ],
  testEnvironment: 'jsdom',
};

module.exports = config;
