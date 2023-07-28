import { Observable } from '../Observable';
import { OnNext } from '../types';

export class MediatorObservable<T> extends Observable<T> {
  addSource<S>(source: Observable<S>, onNext: OnNext<S>) {
    source.subscribe(onNext);
    if (source.value !== undefined) {
      onNext(source.value);
    }
    return this;
  }
}
