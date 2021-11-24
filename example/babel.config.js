module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/plugin-proposal-class-properties', {legacy: true}],
    [`${__dirname}/../dist/transformers/babel-plugin-obsidian-provide`],
  ],
};
