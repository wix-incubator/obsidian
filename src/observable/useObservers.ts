import { useEffect, useState } from 'react';
import { MediatorObservable } from './mediator/MediatorObservable';
import { ObservedValues, Unsubscribe } from './types';
import { mapObservablesToValues } from './mapObservablesToValues';

export function useObservers<T extends Record<string, any>>(observables: T): ObservedValues<T> {
  const [values, setValues] = useState(() => mapObservablesToValues(observables));

  useEffect(() => {
    const mediator = new MediatorObservable();
    const unsubscribers: Unsubscribe[] = [];

    Object.keys(observables as {}).forEach((key) => {
      const onNext = (value: any) => setValues({ ...values, [key]: value });
      mediator.addSource(observables[key], onNext);

      unsubscribers.push(() => {
        observables[key].unsubscribe(onNext);
      });
    });

    return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
  }, []);

  return values;
}
