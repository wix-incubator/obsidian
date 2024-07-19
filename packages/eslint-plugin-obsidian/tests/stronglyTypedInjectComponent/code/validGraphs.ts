export const validGraph = `
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

export const Foo = injectComponent<Own, Injected>(_Foo, SomeGraph);`;

export const validGraphWithoutProps = `
import {injectComponent} from 'src';

const _Foo = () => {
  return null;
};

export const Foo = injectComponent<Own, Injected>(_Foo, SomeGraph);`;

