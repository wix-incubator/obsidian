module.exports = () => {
  return {
    autoDetect: true,

    tests: [
      'test/**/*.test.*',
      'src/**/*.test.*',
    ],

    testFramework: {
      configFile: './jest.dist.config.js'
    }
  }
};
