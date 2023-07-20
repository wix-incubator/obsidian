import { act, renderHook } from '@testing-library/react';
import _ from 'lodash';
import { Observable } from './Observable';
import { useObserver } from './useObserver';

describe('useObserver', () => {
  let observable: Observable<number>;

  const uut = () => {
    const [count, setCount] = useObserver(observable);
    return { count, setCount };
  };

  beforeEach(() => {
    observable = new Observable(0);
  });

  it('should return the current value', () => {
    const { result } = renderHook(uut);
    expect(result.current.count).toBe(0);
  });

  it('should update the value', () => {
    const { result, rerender } = renderHook(uut);
    expect(result.current.count).toBe(0);
    act(() => { observable.value = 1; });
    rerender();
    expect(result.current.count).toBe(1);
  });

  it('should clear the subscription on unmount', () => {
    const { unmount } = renderHook(uut);
    expect(_.get(observable, 'subscribers.size')).toBe(1);
    unmount();
    expect(_.get(observable, 'subscribers.size', 0)).toBe(0);
  });

  it('should update the value with onNext', () => {
    const { result } = renderHook(uut);
    const { setCount } = result.current;
    expect(result.current.count).toBe(0);

    act(() => { setCount(1); });
    expect(result.current.count).toBe(1);
  });

  it('should support getting the observable from a generator function', () => {
    const uut2 = () => {
      const [count, setCount] = useObserver(() => new Observable(1));
      return { count, setCount };
    };

    const { result, rerender } = renderHook(uut2);
    expect(result.current.count).toBe(1);

    act(() => { result.current.setCount(2); });
    expect(result.current.count).toBe(2);

    rerender();
    expect(result.current.count).toBe(2);
  });
});
