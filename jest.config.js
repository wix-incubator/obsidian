const config = {
  resetMocks: true,
  resetModules: true,
  roots: [
    'node_modules',
    'transformers',
    'test',
  ],
  modulePathIgnorePatterns : [
    'example',
  ],
};

module.exports = config;
