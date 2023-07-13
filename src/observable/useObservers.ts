/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { Observable } from './Observable';
import { MediatorObservable } from './MediatorObservable';

type ObservableMapToValues<T> = { [K in keyof T]: T[K] extends Observable<infer R> ? R : never };

export function useObservers<T extends Record<string, any>>(observables: T): ObservableMapToValues<T> {
  const [values, setValues] = useState(() => mapObservablesToValues(observables));

  useEffect(() => {
    const mediator = new MediatorObservable();
    Object.keys(observables as {}).forEach((key) => {
      mediator.addSource(observables[key], (value) => {
        setValues((currentValues) => ({ ...currentValues, [key]: value }));
      });
    });

    return mediator.subscribe();
  }, []);

  return values;
}

function mapObservablesToValues<T extends Record<string, any>>(observables: T): ObservableMapToValues<T> {
  return Object.fromEntries(
    Object.entries(observables).map(([key, observable]) => [key, observable.value]),
  ) as ObservableMapToValues<T>;
}
