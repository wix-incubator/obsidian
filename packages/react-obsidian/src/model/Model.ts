type UseColdObservables = typeof import('../observable/cold/useColdObservers').useColdObservables;
import { Observable } from '../observable/Observable';
import { isReactAvailable } from '../utils/reactAvailability';

const useColdObservables: UseColdObservables = isReactAvailable()
  ? require('../observable/cold/useColdObservers').useColdObservables
  : (_: never) => {};

export abstract class Model {
  public use<T extends Model>(this: T) {
    const observables: Record<string, Observable<any>> = {};
    Object.getOwnPropertyNames(this).forEach((propertyName: string) => {
      const property = (this as any)[propertyName];
      if (property instanceof Observable) {
        observables[propertyName] = property;
      }
    });
    return useColdObservables<T>(observables as any);
  }
}
