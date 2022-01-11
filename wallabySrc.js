module.exports = () => {
  return {
    autoDetect: true,

    tests: [
      'test/**/*.test.*',
      'test/**/*.ts',
      'test/**/*.tsx',
      'src/**/*.test.*',
    ],

    testFramework: {
      configFile: './jest.src.config.js'
    }
  }
};
