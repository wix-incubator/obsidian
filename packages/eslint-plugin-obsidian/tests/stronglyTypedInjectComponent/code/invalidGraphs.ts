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

export const invalidGraphOnlyWithOwnProps = `
import {injectComponent} from 'src';

type Own = {
  name: string;
};

const _Foo = (props: Own & Injected) => {
  return null;
};

export const Foo = injectComponent(_Foo, SomeGraph);`;

export const invalidGraphWithOwnPropsAndUnexpectedInjectedProps = `
import {injectComponent} from 'src';

type Own = { foo: any }

const _Foo = (props: Own) => {
  return null;
};

export const Foo = injectComponent<Own, Injected>(_Foo, SomeGraph);`;

export const invalidGraphWithInjectedProps = `
import {injectComponent} from 'src';

type Injected = {
  name: string;
};

const _Foo = (props: Injected) => {
  return null;
};

export const Foo = injectComponent<Injected>(_Foo, SomeGraph);`;
