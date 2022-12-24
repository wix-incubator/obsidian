import { renderHook } from '@testing-library/react-hooks';
import _ from 'lodash';
import { Observable } from './Observable';
import { useObserver } from './useObserver';

describe('useObserver', () => {
  const object = {
    count: 0,
  };

  let observable: Observable<typeof object>;

  const uut = () => {
    const [count] = useObserver(observable);
    return count;
  };

  beforeEach(() => {
    observable = new Observable(object);
  });

  it('should return the current value', () => {
    const { result } = renderHook(uut);
    expect(result.current.count).toBe(0);
  });

  it('should update the value', () => {
    const { result, rerender } = renderHook(uut);
    expect(result.current.count).toBe(0);
    observable.value = {
      count: 1,
    };
    rerender();
    expect(result.current.count).toBe(1);
  });

  it('should clear the subscription on unmount', () => {
    const { unmount } = renderHook(uut);
    expect(_.get(observable, 'subscribers.size')).toBe(1);
    unmount();
    expect(_.get(observable, 'subscribers.size', 0)).toBe(0);
  });
});
