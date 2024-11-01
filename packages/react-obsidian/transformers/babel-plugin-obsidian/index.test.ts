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

const v3Syntax = {
  unnamedProvider,
  namedProvider,
  noArgsProvider,
  unnamedInject,
  namedInject,
  unnamedLateInject,
  namedLateInject,
};

const v2Syntax = {
  unnamedProvider: unnamedProvider.replace('@provides', '@Provides'),
  namedProvider: namedProvider.replace('@provides', '@Provides'),
  noArgsProvider: noArgsProvider.replace('@provides', '@Provides'),
  unnamedInject: unnamedInject.replace('@inject', '@Inject'),
  namedInject: namedInject.replace('@inject', '@Inject'),
  unnamedLateInject: unnamedLateInject.replace('@lateInject', '@LateInject'),
  namedLateInject: namedLateInject.replace('@lateInject', '@LateInject'),
};

const testCases = [
  {
    description: 'Adds method name to provider arguments (@Provider() -> @Provider({name: "myProvidedDependency"})',
    testCase: 'unnamedProvider',
  },
  {
    description: 'Does not add name if name is provided by the user',
    testCase: 'namedProvider',
  },
  {
    description: 'handles providers that have no arguments',
    testCase: 'noArgsProvider',
  },
  {
    description: 'Adds property name to @Inject arguments @Inject -> @Inject("myDependency")',
    testCase: 'unnamedInject',
  },
  {
    description: 'Does not add property name to @Inject if name is provided by the user',
    testCase: 'namedInject',
  },
  {
    description: 'Adds property name to @LateInject arguments @LateInject -> @LateInject("myDependency")',
    testCase: 'unnamedLateInject',
  },
  {
    description: 'Does not add property name to @LateInject if name is provided by the user',
    testCase: 'namedLateInject',
  },
] as const;

const versions = [
  { version: 'v2', syntax: v2Syntax },
  { version: 'v3', syntax: v3Syntax },
];

describe('Provider Arguments Transformer', () => {
  const uut = providerArgumentsTransformer;

  versions.forEach(({ version, syntax }) => {
    describe(`Testing with ${version} syntax`, () => {
      it.each(testCases)('$description', ({ testCase }) => {
        const result = transformSync(syntax[testCase]);
        expect(result?.code).toMatchSnapshot();
      });
    });
  });

  const transformSync = (snippet: string) => babel.transformSync(snippet, {
    plugins: [
      ['@babel/plugin-proposal-decorators', { version: '2023-11' }],
      uut,
    ],
    ast: true,
    configFile: false,
  });
});
