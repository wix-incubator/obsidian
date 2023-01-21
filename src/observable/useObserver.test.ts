import { renderHook } from '@testing-library/react-hooks';
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
    observable.value = 1;
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

    setCount(1);
    expect(result.current.count).toBe(1);
  });
});
