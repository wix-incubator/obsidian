import { renderHook } from '@testing-library/react-hooks';
import MainGraph from '../../../test/fixtures/MainGraph';
import Subgraph from '../../../test/fixtures/Subgraph';
import { ProvidedDependencies } from '../../types';
import { injectHook } from './InjectHook';

describe('injectHook', () => {
  const hook = ({ ownProp, someString }: OwnProps & InjectedProps): Result => {
    return { ownProp, someString };
  };

  interface OwnProps {
    ownProp: string;
  }

  interface InjectedProps extends ProvidedDependencies<MainGraph>, ProvidedDependencies<Subgraph> {}

  interface Result {
    ownProp: string;
    someString: string;
  }

  const expectedResult: Result = {
    ownProp: 'required prop',
    someString: 'Fear kills progress',
  };

  it('Both own and injected props are defined', () => {
    const injectedHook = injectHook<OwnProps, InjectedProps>(hook, MainGraph);
    const { result } = renderHook(injectedHook, { initialProps: { ownProp: expectedResult.ownProp } });
    expect(result.current).toStrictEqual(expectedResult);
  });

  it('Only own props are defined', () => {
    const injectedHook = injectHook<OwnProps>(hook, MainGraph);
    const { result } = renderHook(injectedHook, { initialProps: { ownProp: expectedResult.ownProp } });
    expect(result.current).toStrictEqual(expectedResult);
  });

  it('Props type is inferred', () => {
    const injectedHook = injectHook(hook, MainGraph);
    const { result } = renderHook(injectedHook, { initialProps: { ownProp: expectedResult.ownProp } });
    expect(result.current).toStrictEqual(expectedResult);
  });
});
