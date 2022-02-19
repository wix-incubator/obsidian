module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' }, loose: true }],
    ['@babel/preset-typescript', {'onlyRemoveTypeImports': true}],
    '@babel/preset-react',
  ],
  plugins: [
    `${__dirname}/dist/transformers/babel-plugin-obsidian`,
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    'babel-plugin-parameter-decorator'
  ],
};
