import * as swc from '@swc/core';
import { ObsidianSWCPlugin } from './index';

// const unnamedProvider = `class MainGraph {
//   @Provides()
//   someString(stringProvider, emptyString) {
//     return stringProvider.theString + emptyString;
//   }
// }`;

// const namedProvider = `class MainGraph {
//   @Provides({name: 'myDependency'})
//   someString(stringProvider) {
//     return stringProvider.theString;
//   }
// }`;

const noArgsProvider = `class MainGraph {
  @Provides()
  someString() {
    return 'someString';
  }
}`;

// const unnamedConstructorInject = `class MainGraph {
//   constructor(@Inject() arg) {}
// }`;

// const unnamedInject = `class MainGraph {
//   @Inject() someString;
// }`;

// const namedInject = `class MainGraph {
//   @Inject('myDependency') someString;
// }`;

// const unnamedLateInject = `class MainGraph {
//   @LateInject() someString;
// }`;

// const namedLateInject = `class MainGraph {
//   @LateInject('myDependency') someString;
// }`;

describe('Provider Arguments Transformer', () => {
  // const uut: Function = providerArgumentsTransformer;

  // it('Adds method name to provider arguments (@Provider() -> @Provider({name: "myProvidedDependency"})', () => {
  //   const result = transformSync(unnamedProvider);
  //   expect(result?.code).toMatchSnapshot();
  // });

  // it('Does not add name if name is provided by the user', () => {
  //   const result = transformSync(namedProvider);
  //   expect(result?.code).toMatchSnapshot();
  // });

  // it('handles providers that have no arguments', () => {
  //   const result = transformSync(noArgsProvider);
  //   expect(result?.code).toMatchSnapshot();
  // });

  // it('saves constructor argument name in Inject - @Inject -> @Inject(arg)', () => {
  //   const result = transformSync(unnamedConstructorInject);
  //   expect(result?.code).toMatchSnapshot();
  // });

  // it('Adds property name to @Inject arguments @Inject -> @Inject("myDependency")', () => {
  //   const result = transformSync(unnamedInject);
  //   expect(result?.code).toMatchSnapshot();
  // });

  // it('Does not add property name to @Inject if name is provided by the user', () => {
  //   const result = transformSync(namedInject);
  //   expect(result?.code).toMatchSnapshot();
  // });

  // it('Adds property name to @LateInject arguments @LateInject -> @LateInject("myDependency")', () => {
  //   const result = transformSync(unnamedLateInject);
  //   expect(result?.code).toMatchSnapshot();
  // });

  // it('Does not add property name to @LateInject if name is provided by the user', () => {
  //   const result = transformSync(namedLateInject);
  //   expect(result?.code).toMatchSnapshot();
  // });

  it.only('Provides a dependency from an unnamed provider', () => {
    const result = transformSync(noArgsProvider);
    // console.log(result?.code);
    const parsedProvider = eval(result?.code!);
    console.log(parsedProvider);
  });

  const transformSync = (snippet: string) => swc.transformSync(snippet, {
    filename: "input.js",
    jsc: {
    parser: {
      syntax: "typescript",
      decorators: true
    }
  },
    plugin(m) {
      return new ObsidianSWCPlugin().visitProgram(m);
    },
  });
});
