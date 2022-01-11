// const {defaults: tsjPreset} = require('ts-jest/presets');
const config = {
  preset: 'ts-jest',
  resetMocks: true,
  resetModules: true,
  roots: [
    'node_modules',
    'src',
    'transformers',
    'test',
  ],
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  globals: {
    'ts-jest': {
      babelConfig: {
        plugins: [
          `${__dirname}/dist/transformers/babel-plugin-obsidian-provide`,
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-proposal-class-properties', { legacy: true }],
          'babel-plugin-parameter-decorator'
        ],
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-typescript', {'onlyRemoveTypeImports': true}],
        ]
      }
    }
  },
  setupFilesAfterEnv: [
    "./test/jest.setup.ts"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};

module.exports = config;
