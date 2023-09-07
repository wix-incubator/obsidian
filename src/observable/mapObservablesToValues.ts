import { ObservedValues } from './types';

export function mapObservablesToValues<T extends Record<string, any>>(observables: T): ObservedValues<T> {
  return Object.fromEntries(
    Object.entries(observables).map(([key, observable]) => [key, observable.value]),
  ) as ObservedValues<T>;
}
