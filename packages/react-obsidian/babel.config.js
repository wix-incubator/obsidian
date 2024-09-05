module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current', 'esmodules': true } }],
    ['@babel/preset-typescript', { 'onlyRemoveTypeImports': true }],
    '@babel/preset-react',
  ],
  plugins: [
    `${__dirname}/dist/transformers/babel-plugin-obsidian`,
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-transform-class-properties',
    'babel-plugin-parameter-decorator'
  ],
};
