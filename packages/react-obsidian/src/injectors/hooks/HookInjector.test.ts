import { renderHook } from '@testing-library/react';
import { useState } from 'react';
import StringProvider from '../../../test/fixtures/StringProvider';
import Subgraph from '../../../test/fixtures/Subgraph';
import injectedValues from '../../../test/fixtures/injectedValues';
import HookInjector from './HookInjector';
import MainGraph from '../../../test/fixtures/MainGraph';
import { DependenciesOf } from '../../types';
import { LifecycleBoundGraph } from '../../../test/fixtures/LifecycleBoundGraph';
import { GraphWithOnBind } from '../../../test/fixtures/GraphWithOnBind';

describe('Hook injection', () => {
  let uut: HookInjector;

  beforeEach(() => {
    uut = new HookInjector();
  });

  it('injects primitive dependencies', () => {
    const { result } = renderHook(() => uut.inject(hookA, MainGraph)());
    expect(result.current.text).toBe(`${injectedValues.fromStringProvider} from hook`);
  });

  it('injects composite objects', () => {
    const { result } = renderHook(() => uut.inject(hookB, Subgraph)());
    expect(result.current.text).toBe(`${injectedValues.fromStringProvider} from hook`);
  });

  it('passes hook arguments to graph constructor', () => {
    type Own = { stringFromProps: string };
    type Injected = DependenciesOf<LifecycleBoundGraph, 'computedFromProps'>;

    const { result } = renderHook((props: Own) => {
      return uut.inject<Own & Injected, any>(hookC, LifecycleBoundGraph)(props);
    }, { initialProps: { stringFromProps: 'Hey!' } });

    expect(result.current.text).toBe('A string passed via props: Hey!');
  });

  it('Binds hooks to the graph before providers are resolved', () => {
    const hookToTestOnBind = ({ targetName }: { targetName: string }) => {
      return targetName;
    };
    const { result } = renderHook(() => uut.inject(hookToTestOnBind, GraphWithOnBind)());
    expect(result.current).toBe('hookToTestOnBind');
  });
});

interface Hook {
  text: string;
}

const hookA = ({ someString }: { someString: string }): Hook => {
  const [text] = useState(`${someString} from hook`);
  return { text };
};

const hookB = ({ stringProvider }: { stringProvider: StringProvider }): Hook => {
  const [text] = useState(`${stringProvider.theString} from hook`);
  return { text };
};

const hookC = ({ computedFromProps }: DependenciesOf<LifecycleBoundGraph, 'computedFromProps'>): Hook => {
  return { text: computedFromProps };
};
