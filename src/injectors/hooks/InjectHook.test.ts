import { renderHook } from '@testing-library/react-hooks';
import MainGraph from '../../../test/fixtures/MainGraph';
import Subgraph from '../../../test/fixtures/Subgraph';
import { DependenciesOf } from '../../types';
import { injectHook, injectHookWithArguments } from './InjectHook';

describe('injectHook', () => {
  type InjectedProps = DependenciesOf<[MainGraph, Subgraph]>;

  interface OwnProps {
    ownProp: string;
  }

  const hook = ({ ownProp, someString }: OwnProps & InjectedProps): Result => {
    return { ownProp, someString };
  };

  interface Result {
    ownProp: string;
    someString: string;
  }

  const expectedResult: Result = {
    ownProp: 'required prop',
    someString: 'Fear kills progress',
  };

  describe('injectHook', () => {
    it('Generics defined', () => {
      const injectedHook = injectHook<Result, InjectedProps & OwnProps>(hook, MainGraph);
      const { result } = renderHook(injectedHook, { initialProps: { ownProp: expectedResult.ownProp } });
      expect(result.current).toStrictEqual(expectedResult);
    });

    it('Generics are not defined', () => {
      const injectedHook = injectHook(hook, MainGraph);
      const { result } = renderHook(injectedHook, { initialProps: { ownProp: expectedResult.ownProp } });
      expect(result.current).toStrictEqual(expectedResult);
    });
  });

  describe('injectHookWithArguments', () => {
    it('Generics defined', () => {
      const injectedHook = injectHookWithArguments<Result, InjectedProps, OwnProps>(hook, MainGraph);
      const { result } = renderHook(injectedHook, { initialProps: { ownProp: expectedResult.ownProp } });
      expect(result.current).toStrictEqual(expectedResult);
    });
  });
});
