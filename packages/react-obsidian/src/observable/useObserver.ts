/* eslint-disable no-param-reassign */
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
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
    const unsubscribe = observable.subscribe(setValue);
    reconcileStateWithObservableAfterResume<T>(setValue, observable);
    return unsubscribe;
  }, [observable]);

  return [value, onNext];
}

function reconcileStateWithObservableAfterResume<T>(setValue: Dispatch<any>, observable: Observable<any>) {
  setValue((currentValue: T) => (
    Object.is(currentValue, observable.value) ? currentValue : observable.value
  ));
}

function getOrGenerateObservable(observableOrGenerator: ObservableOrGenerator<any>) {
  return observableOrGenerator instanceof Observable ? observableOrGenerator : observableOrGenerator();
}
