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
  transformIgnorePatterns: [
    'example/node_modules\/(?!react-obsidian)(.*)'
  ]
};

module.exports = config;
