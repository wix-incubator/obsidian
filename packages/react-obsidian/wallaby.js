module.exports = () => {
  return {
    autoDetect: true,
    testFramework: {
      configFile: 'jest.config.js',
    },
    env: {params: {env: 'NODE_OPTIONS="--max_old_space_size=4096"'}},
  };
};
