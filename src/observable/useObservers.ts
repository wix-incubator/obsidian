import { useEffect, useState } from 'react';
import { Observable } from './Observable';
import { MediatorObservable } from './MediatorObservable';

type PickObservables<T, U = Observable<any>> = Pick<
T,
{ [K in keyof T]: T[K] extends U ? K : never }[keyof T]
>;

type ObservedValues<T> = { [K in keyof T]: T[K] extends Observable<infer R> ? R : never };

export function useObservers<T extends Record<string, any>>(observables: T): ObservedValues<T> {
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

function mapObservablesToValues<T extends Record<string, any>>(observables: T): ObservedValues<T> {
  return Object.fromEntries(
    Object.entries(observables).map(([key, observable]) => [key, observable.value]),
  ) as ObservedValues<T>;
}
