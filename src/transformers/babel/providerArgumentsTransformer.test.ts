import { PluginObj } from '@babel/core';
import * as babel from '@babel/core';
import providerArgumentsTransformer from './providerArgumentsTransformer';

const code = `class MainGraph {
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
      ast: true,
      configFile: false,
    });
    console.log(JSON.stringify(result?.ast));
  });
});
