/** @type {import('jest').Config} */
const config = {
  resetMocks: true,
  resetModules: true,
  roots: [
    'rules',
  ],
  testEnvironment: 'jsdom',
};

module.exports = config;
