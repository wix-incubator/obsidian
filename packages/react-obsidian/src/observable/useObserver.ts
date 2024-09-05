import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Observable } from './Observable';

type ObservableOrGenerator<T> = Observable<T> | (() => Observable<T>);

export function useObserver<T>(observableOrGenerator: ObservableOrGenerator<T>): [T, (next: T) => void] {
  const observable = useMemo(
    () => getOrGenerateObservable(observableOrGenerator),
    [],
  );
  const [value, setValue] = useState(observable.value);
  const onNext = useCallback((next: T) => {
    observable.value = next;
  }, [observable]);

  useEffect(() => {
    return observable.subscribe(setValue);
  }, [observable]);

  return [value, onNext];
}

function getOrGenerateObservable<T>(observableOrGenerator: ObservableOrGenerator<T>): Observable<T> {
  return observableOrGenerator instanceof Observable ? observableOrGenerator : observableOrGenerator();
}
