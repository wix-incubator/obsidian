module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-typescript', {'onlyRemoveTypeImports': true}],
    '@babel/preset-react',
  ],
  plugins: [
    `${__dirname}/dist/transformers/babel-plugin-obsidian-provide`,
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { legacy: true }],
    'babel-plugin-parameter-decorator'
  ],
};
