import { useEffect, useState } from 'react';
import { MediatorObservable } from './mediator/MediatorObservable';
import { ObservedValues } from './types';
import { mapObservablesToValues } from './mapObservablesToValues';

export function useObservers<T extends Record<string, any>>(observables: T): ObservedValues<T> {
  const [values, setValues] = useState(() => mapObservablesToValues(observables));

  useEffect(() => {
    const mediator = new MediatorObservable();
    Object.keys(observables as {}).forEach((key) => {
      mediator.addSource(observables[key], (value) => {
        setValues({ ...values, [key]: value });
      });
    });

    return mediator.subscribe();
  }, []);

  return values;
}
