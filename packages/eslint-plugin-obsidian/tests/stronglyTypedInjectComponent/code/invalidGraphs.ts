export const invalidGraph = `
import {injectComponent} from 'src';

type Own = {
  name: string;
};

type Injected = {
  bar: Bar;
};

const _Foo = (props: Own & Injected) => {
  return null;
};

export const Foo = injectComponent(_Foo, SomeGraph);`;
