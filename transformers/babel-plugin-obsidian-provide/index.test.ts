import * as babel from '@babel/core';
import providerArgumentsTransformer from './index';

const unnamedProvider = `class MainGraph {
  @Provides()
  someString(stringProvider) {
    return stringProvider.theString;
  }
}`;

const namedProvider = `class MainGraph {
  @Provides({name: 'myDependency'})
  someString(stringProvider) {
    return stringProvider.theString;
  }
}`;

describe('Provider Arguments Transformer', () => {
  const uut: Function = providerArgumentsTransformer;

  it('Adds method name to provider arguments (@Provider() -> @Provider({name: "myProvidedDependency"})', () => {
    const result = transformSync(unnamedProvider);
    expect(result?.code).toMatchSnapshot();
  });

  it('Does not add name if name is provided by the user', () => {
    const result = transformSync(namedProvider);
    expect(result?.code).toMatchSnapshot();
  });

  const transformSync = (snippet: string) => babel.transformSync(snippet, {
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      uut,
    ],
    ast: true,
    configFile: false,
  });
});
