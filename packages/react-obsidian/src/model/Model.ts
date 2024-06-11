import { useColdObservables } from '../observable/cold/useColdObservers';
import { Observable } from '../observable/Observable';

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
