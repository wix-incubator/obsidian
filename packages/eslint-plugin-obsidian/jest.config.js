/** @type {import('jest').Config} */
const config = {
  resetMocks: true,
  resetModules: true,
  roots: [
    'tests'
  ],
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.setup.js'],
};

module.exports = config;
