import { PluginObj } from '@babel/core';
import * as babel from '@babel/core';
import providerArgumentsTransformer from './providerArgumentsTransformer';

const code = `class MainGraph {
  Provides(clazz, propertyKey, descriptor) {

  }

  @Provides()
  someString(stringProvider) {
    return stringProvider.theString;
  }
}`;

describe('Provider Arguments Transformer', () => {
  const uut: PluginObj = providerArgumentsTransformer();

  it('Exposes transformer', () => {
    const output = babel.transformSync(code, {
      presets: [
        ['@babel/preset-env'],
      ],
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { legacy: true }],
        [uut, { legacy: true }],
      ],
      configFile: false,
    });
    console.log(output);
  });
});
