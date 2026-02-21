import { Observable } from '../Observable';
import {
  Mapper,
  MultiMapper,
  Observables,
  OnNext,
  Observable as IObservable,
  Args,
  OnMultiNext,
} from '../types';

export class MediatorObservable<T> extends Observable<T> {
  mapSource<Source, Result extends T>(source: Observable<Source>, mapNext: Mapper<Source, Result>) {
    this.addSource<Source>(source, (next) => {
      this.value = mapNext(next, this.value as Result) as Result;
    });
    return this;
  }

  addSource<S>(source: IObservable<S>, onNext: OnNext<S>) {
    source.subscribe(onNext);
    if (source.value !== undefined) {
      onNext(source.value);
    }
    return this;
  }

  addSources<S1, S2, S3, S4, S5>(
    sources: Observables<S1, S2, S3, S4, S5>,
    onNext: OnMultiNext<S1, S2, S3, S4, S5>,
  ) {
    const values = new Array(sources.length) as Args<S1, S2, S3, S4, S5>;

    sources.forEach((source, index) => {
      if (source == null) throw new Error(`addSources: source at index ${index} is null or undefined`);
      this.addSource(source as IObservable<any>, (next) => {
        if (values[index] === next) return;

        if (values[index] === undefined) {
          values[index] = next;
        } else {
          values[index] = next;
          onNext(values);
        }
      });
    });

    onNext(values);
    return this;
  }

  mapSources<S1, S2, S3, S4, S5>(
    sources: Observables<S1, S2, S3, S4, S5>,
    mapNext: MultiMapper<T, S1, S2, S3, S4, S5>,
  ) {
    const values = new Array(sources.length) as Args<S1, S2, S3, S4, S5>;

    sources.forEach((source, index) => {
      if (source == null) throw new Error(`mapSources: source at index ${index} is null or undefined`);
      this.addSource(source as IObservable<any>, (next) => {
        if (values[index] === next) return;

        if (values[index] === undefined) {
          values[index] = next;
        } else {
          values[index] = next;
          this.value = mapNext(values, this.value) as T;
        }
      });
    });

    this.value = mapNext(values, this.value);
    return this;
  }
}
