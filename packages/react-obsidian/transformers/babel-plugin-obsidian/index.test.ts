import * as babel from '@babel/core';
import providerArgumentsTransformer from './index';

const unnamedProvider = `class MainGraph {
  @provides()
  someString(stringProvider, emptyString) {
    return stringProvider.theString + emptyString;
  }
}`;

const namedProvider = `class MainGraph {
  @provides({name: 'myDependency'})
  someString(stringProvider) {
    return stringProvider.theString;
  }
}`;

const noArgsProvider = `class MainGraph {
  @provides()
  someString() {
    return 'someString';
  }
}`;

const unnamedInject = `class MainGraph {
  @inject() someString;
}`;

const namedInject = `class MainGraph {
  @inject('myDependency') someString;
}`;

const unnamedLateInject = `class MainGraph {
  @lateInject() someString;
}`;

const namedLateInject = `class MainGraph {
  @lateInject('myDependency') someString;
}`;

describe('Provider Arguments Transformer', () => {
  const uut = providerArgumentsTransformer;

  it('Adds method name to provider arguments (@Provider() -> @Provider({name: "myProvidedDependency"})', () => {
    const result = transformSync(unnamedProvider);
    expect(result?.code).toMatchSnapshot();
  });

  it('Does not add name if name is provided by the user', () => {
    const result = transformSync(namedProvider);
    expect(result?.code).toMatchSnapshot();
  });

  it('handles providers that have no arguments', () => {
    const result = transformSync(noArgsProvider);
    expect(result?.code).toMatchSnapshot();
  });

  it('Adds property name to @Inject arguments @Inject -> @Inject("myDependency")', () => {
    const result = transformSync(unnamedInject);
    expect(result?.code).toMatchSnapshot();
  });

  it('Does not add property name to @Inject if name is provided by the user', () => {
    const result = transformSync(namedInject);
    expect(result?.code).toMatchSnapshot();
  });

  it('Adds property name to @LateInject arguments @LateInject -> @LateInject("myDependency")', () => {
    const result = transformSync(unnamedLateInject);
    expect(result?.code).toMatchSnapshot();
  });

  it('Does not add property name to @LateInject if name is provided by the user', () => {
    const result = transformSync(namedLateInject);
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
