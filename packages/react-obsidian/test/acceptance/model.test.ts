import { act, renderHook } from '@testing-library/react';
import {
  DependenciesOf,
  graph,
  Model,
  ObjectGraph,
  Observable,
  provides,
  injectHook,
} from '../../src';

describe('Model', () => {
  let model!: FooModel;
  let renderCount: number;

  beforeEach(() => {
    renderCount = 0;
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

  it('should not rerender when an unobserved value changes', () => {
    renderHook(() => useInjectedFoo());
    expect(model.unusedObservable.value).toBe(true);

    act(() => { model.unusedObservable.value = false; });

    expect(renderCount).toBe(1);
  });

  class FooModel extends Model {
    public readonly foo = new Observable(1);
    public readonly bar = new Observable('bar');
    public readonly unusedObservable = new Observable(true);
  }

  @graph()
  class FooGraph extends ObjectGraph {
    @provides()
    fooModel() {
      return model;
    }
  }

  const useFoo = ({ fooModel }: DependenciesOf<FooGraph, 'fooModel'>) => {
    const { foo, bar } = fooModel.use();
    renderCount += 1;
    return { foo, bar };
  };

  const useInjectedFoo = injectHook(useFoo, FooGraph);
});
