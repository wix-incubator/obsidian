import { useObservers } from '../observable/useObservers';
import { Observable } from '../observable/Observable';

export abstract class Model {
  public use<T extends Model>(this: T) {
    const observables: Record<string, Observable<any>> = {};
    Object.getOwnPropertyNames(this).forEach((key: string) => {
      const value = (this as any)[key];
      if (value instanceof Observable) {
        observables[key] = value;
      }
    });
    return useObservers<T>(observables as any);
  }
}
