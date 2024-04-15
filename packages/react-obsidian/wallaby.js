module.exports = () => {
  return {
    autoDetect: true,
    testFramework: {
      configFile: './node_modules/@wix/shono-testjs/dist/src/jestConfig.js',
    },
    env: {params: {env: 'NODE_OPTIONS="--max_old_space_size=4096"'}},
  };
};
