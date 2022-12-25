/* eslint-disable no-param-reassign */
import { useCallback, useEffect, useState } from 'react';
import { Observable } from './Observable';

export function useObserver<T>(observable: Observable<T>): [T, (next: T) => void] {
  const [value, setValue] = useState(observable.value);
  const onNext = useCallback((next: T) => {
    setValue(next);
    observable.value = value;
  }, [observable]);

  useEffect(() => {
    return observable.subscribe(setValue);
  }, [observable]);

  return [value, onNext];
}
