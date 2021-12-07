import { renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';
import StringProvider from 'test/integration/fixtures/StringProvider';
import Subgraph from '../../../test/integration/fixtures/Subgraph';
import injectedValues from '../../../test/integration/fixtures/injectedValues';
import HookInjector from './HookInjector';
import MainGraph from '../../../test/integration/fixtures/MainGraph';

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
