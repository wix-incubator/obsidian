import { useEffect, useState } from 'react';
import { ColdMediatorObservable } from './ColdMediatorObservable';
import { ObservedValues } from '../types';
import { mapObservablesToValues } from '../mapObservablesToValues';

export function useColdObservables<T extends Record<string, any>>(observables: T): ObservedValues<T> {
  const [mediator] = useState(
    () => new ColdMediatorObservable<T>(mapObservablesToValues(observables) as T),
  );
  const [values, setValues] = useState(() => mediator.value as ObservedValues<T>);

  useEffect(() => {
    Object.keys(observables).forEach((key) => {
      mediator.addSource(observables[key], (value) => {
        mediator.setValue(key, value);
      });
    });

    return mediator.subscribe(setValues);
  }, []);

  return values;
}
