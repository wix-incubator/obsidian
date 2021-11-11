import { PluginObj } from '@babel/core';
import * as babel from '@babel/core';
import providerArgumentsTransformer from './providerArgumentsTransformer';

const code = `class MainGraph {
  Provides(clazz, propertyKey, descriptor) { }

  @Provides()
  someString(stringProvider) {
    return stringProvider.theString;
  }
}`;

describe('Provider Arguments Transformer', () => {
  const uut: PluginObj = providerArgumentsTransformer;

  it('Exposes transformer', () => {
    const result = babel.transformSync(code, {
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        uut,
      ],
      configFile: false,
    });
    console.log(result?.code);
  });
});
