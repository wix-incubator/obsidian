import { act, renderHook } from '@testing-library/react';
import {
  DependenciesOf,
  Graph,
  Model,
  ObjectGraph,
  Observable,
  Provides,
  injectHook,
} from '../../src';

describe('Model', () => {
  let model!: FooModel;

  beforeEach(() => {
    model = new FooModel();
  });

  it('should support getting all observables with a single function', () => {
    const { result } = renderHook(() => useInjectedFoo());

    expect(result.current.foo).toBe(1);
    expect(result.current.bar).toBe('bar');
  });

  it('should rerender when an observed value changes', () => {
    const { result } = renderHook(() => useInjectedFoo());

    act(() => { model.foo.value = 2; });
    expect(result.current.foo).toBe(2);
  });

  class FooModel extends Model {
    public readonly foo = new Observable(1);
    public readonly bar = new Observable('bar');
  }

  @Graph()
  class FooGraph extends ObjectGraph {
    @Provides()
    fooModel() {
      return model;
    }
  }

  const useFoo = ({ fooModel }: DependenciesOf<FooGraph, 'fooModel'>) => {
    const { foo, bar } = fooModel.use();
    return { foo, bar };
  };

  const useInjectedFoo = injectHook(useFoo, FooGraph);
});
