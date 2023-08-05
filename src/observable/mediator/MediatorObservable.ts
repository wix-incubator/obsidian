import { Observable } from '../Observable';
import { Mapper, OnNext } from '../types';

export class MediatorObservable<T> extends Observable<T> {
  mapSource<Source, Result extends T>(source: Observable<Source>, mapNext: Mapper<Source, Result>) {
    this.addSource<Source>(source, (next) => {
      const mapped = mapNext(next, this.value as Result) as Result;
      this.value = mapped;
    });
    return this;
  }

  addSource<S>(source: Observable<S>, onNext: OnNext<S>) {
    source.subscribe(onNext);
    if (source.value !== undefined) {
      onNext(source.value);
    }
    return this;
  }
}
