import {
useEffect,
useState,
type Dispatch,
type SetStateAction,
} from 'react';
import { ColdMediatorObservable } from './ColdMediatorObservable';
import { ObservedValues } from '../types';
import { mapObservablesToValues } from '../mapObservablesToValues';

export function useColdObservables<T extends Record<string, any>>(observables: T): ObservedValues<T> {
  const [mediator] = useState(
    () => new ColdMediatorObservable<T>(mapObservablesToValues(observables) as T),
  );
  const [values, setValues] = useState(() => mediator.value as ObservedValues<T>);

  useEffect(() => {
    const unsubscribers = subscribeMediatorToObservables<T>(observables, mediator);
    const unsubscribeFromMediator = mediator.subscribe(setValues);
    reconcileStateWithMediatorAfterResume<T>(setValues, mediator);
    syncMediatorWithObservableValues<T>(observables, mediator);

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
      unsubscribeFromMediator();
    };
  }, []);

  return values;
}

function subscribeMediatorToObservables<T extends Record<string, any>>(
  observables: T,
  mediator: ColdMediatorObservable<T>,
) {
  return Object.keys(observables as {}).map((key) => {
    return observables[key].subscribe(((value: T[typeof key]) => mediator.setValue(key, value)));
  });
}

function syncMediatorWithObservableValues<T extends Record<string, any>>(
  observables: T,
  mediator: ColdMediatorObservable<T>,
) {
  (Object.keys(observables as {}) as Array<keyof T>).forEach((key) => {
    mediator.setValue(key, observables[key].value);
  });
}

function reconcileStateWithMediatorAfterResume<T extends Record<string, any>>(
  setValues: Dispatch<SetStateAction<ObservedValues<T>>>,
  mediator: ColdMediatorObservable<T>,
) {
  setValues((currentValues) => (
    Object.is(currentValues, mediator.value as ObservedValues<T>)
      ? currentValues
      : mediator.value as ObservedValues<T>
  ));
}

