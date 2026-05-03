import {
useEffect,
useState,
type Dispatch,
type SetStateAction,
} from 'react';
import { ObservedValues } from './types';
import { mapObservablesToValues } from './mapObservablesToValues';

export function useObservers<T extends Record<string, any>>(observables: T): ObservedValues<T> {
  const [values, setValues] = useState(() => mapObservablesToValues(observables));

  useEffect(() => {
    const unsubscribers = Object.keys(observables as {}).map((key) => {
      return observables[key].subscribe(((value: T[typeof key]) => {
          updateObservedValueIfChanged<T>(setValues, key, value);
        }));
    });
    reconcileStateAfterResume<T>(setValues, observables);
    return () => unsubscribers.forEach(unsubscribe => unsubscribe());
  }, []);

  return values;
}

function updateObservedValueIfChanged<T extends Record<string, any>>(
  setValues: Dispatch<SetStateAction<ObservedValues<T>>>,
  key: string,
  value: T[string],
) {
  setValues((currentValues) => (
    Object.is(currentValues[key], value)
      ? currentValues
      : { ...currentValues, [key]: value }
  ));
}

function reconcileStateAfterResume<T extends Record<string, any>>(
  setValues: Dispatch<SetStateAction<ObservedValues<T>>>,
  observables: T,
) {
  setValues((currentValues) => {
    const nextValues = mapObservablesToValues(observables);
    return haveObservedValuesChanged(currentValues, nextValues) ? nextValues : currentValues;
  });
}

function haveObservedValuesChanged<T extends Record<string, any>>(
  currentValues: ObservedValues<T>,
  nextValues: ObservedValues<T>,
) {
  return (Object.keys(nextValues as {}) as Array<keyof T>).some((key) => (
    !Object.is(currentValues[key], nextValues[key])
  ));
}
