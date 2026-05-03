import React, { Activity } from 'react';
import {
  act,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import _ from 'lodash';
import { Observable } from './Observable';
import { useObservers } from './useObservers';

describe('useObservers', () => {
  let fooObservable: Observable<number>;
  let barObservable: Observable<string>;
  let bazObservable: Observable<boolean>;

  const uut = () => {
    const { foo, bar, baz } = useObservers({ foo: fooObservable, bar: barObservable, baz: bazObservable });
    return { foo, bar, baz };
  };

  beforeEach(() => {
    fooObservable = new Observable(0);
    barObservable = new Observable('bar');
    bazObservable = new Observable(true);
  });

  it('should return the current values', () => {
    const { result } = renderHook(uut);
    expect(result.current.foo).toBe(0);
    expect(result.current.bar).toBe('bar');
    expect(result.current.baz).toBe(true);
  });

  it('should rerender when an observed value changes', () => {
    const { result } = renderHook(uut);
    expect(result.current.foo).toBe(0);
    act(() => { fooObservable.value = 1; });
    expect(result.current.foo).toBe(1);
  });

  it('should release onNext callbacks when unmounted', () => {
    const { unmount } = renderHook(uut);
    unmount();

    [fooObservable, barObservable, bazObservable].forEach((observable) => {
      expect(_.get(observable, 'subscribers.size')).toBe(0);
    });
  });

  it('should refresh the latest values after Activity resume', () => {
    const Component = () => {
      const { foo, bar, baz } = useObservers({
        foo: fooObservable,
        bar: barObservable,
        baz: bazObservable,
      });

      return <span data-testid="values">{`${foo}-${bar}-${String(baz)}`}</span>;
    };

    const { rerender } = render(
      <Activity mode="visible">
        <Component />
      </Activity>,
    );

    expect(screen.getByTestId('values')).toHaveTextContent('0-bar-true');

    rerender(
      <Activity mode="hidden">
        <Component />
      </Activity>,
    );

    act(() => {
      fooObservable.value = 1;
      barObservable.value = 'baz';
    });

    rerender(
      <Activity mode="visible">
        <Component />
      </Activity>,
    );

    expect(screen.getByTestId('values')).toHaveTextContent('1-baz-true');
  });
});
