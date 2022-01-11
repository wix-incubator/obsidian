module.exports = () => {
  return {
    autoDetect: true,

    tests: [
      'test/**/*.test.*',
      'src/**/*.test.*',
    ],

    testFramework: {
      configFile: './jest.src.config.js'
    }
  }
};
