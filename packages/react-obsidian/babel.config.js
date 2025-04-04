module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-typescript', { 'onlyRemoveTypeImports': true }],
    '@babel/preset-react',
  ],
  plugins: [
    `${__dirname}/dist/transformers/babel-plugin-obsidian`,
    ['@babel/plugin-proposal-decorators', { version: '2023-11' }],
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-transform-class-static-block',
    'babel-plugin-parameter-decorator'
  ],
};
