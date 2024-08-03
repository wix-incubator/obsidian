export const validGraph = `
import {injectComponent} from 'src';

type Own = {
  name: string;
};

type InjectedProps = {
  bar: Bar;
};

const _Foo = (props: Own & InjectedProps) => {
  return null;
};

export const Foo = injectComponent<Own, InjectedProps>(_Foo, SomeGraph);`;

export const validGraphWithPropsInWrongOrder = `
import {injectComponent} from 'src';

type Own = {
  name: string;
};

type Injected = {
  bar: Bar;
};

const _Foo = ({foo, bar}: Injected & Own) => {
  return null;
};

export const Foo = injectComponent<Own, Injected>(_Foo, SomeGraph);`;

export const validGraphWithoutProps = `
import {injectComponent} from 'src';

const _Foo = () => {
  return null;
};

export const Foo = injectComponent(_Foo, SomeGraph);`;

export const validGraphWithOwnProps = `
import {injectComponent} from 'src';

type Own = {
  name: string;
};

const _Foo = (props: Own) => {
  return null;
};

export const Foo = injectComponent<Own>(_Foo, SomeGraph);`;

export const validGraphWithInjectedProps = `
import {injectComponent} from 'src';

type Injected = {
  name: string;
};

const _Foo = (props: Injected) => {
  return null;
};

export const Foo = injectComponent(_Foo, SomeGraph);`;

export const validGraphWithUntypedProps = `
import {injectComponent} from 'src';

const _Foo = (props: any) => {
  return null;
};

export const Foo = injectComponent(_Foo, SomeGraph);`;

export const validGraphWithInlineTypes = `
const Component = ({ computedFromProps }: DependenciesOf<LifecycleBoundGraph, 'computedFromProps'>) => {
  return null;
};

const InjectedComponent = injectComponent<{ stringFromProps: string }>(Component, LifecycleBoundGraph);
`;

export const validGraphThatDoesNotUseOwnProps = `
type Own = {
  name: string;
};

type Injected = {
  bar: Bar;
};

const _Foo = ({foo, bar}: Injected) => {
  return null;
};

export const Foo = injectComponent<Own, Injected>(_Foo, SomeGraph);`;
