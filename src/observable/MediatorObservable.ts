import { Observable } from './Observable';
import { OnNext, Unsubscribe, Observable as IObservable } from './types';

type Source<T> = {
  source: Observable<T>;
  onNext: OnNext<T>;
  unsubscribe?: Unsubscribe;
};

export class MediatorObservable<T> implements IObservable<T> {
  private subscribers: Set<OnNext<T>> = new Set();
  private currentValue!: T;
  private sources: Source<any>[] = [];

  constructor(initialValue?: T) {
    this.currentValue = initialValue as T;
  }

  addSource<S>(source: Observable<S>, onNext: OnNext<S>): MediatorObservable<T> {
    this.sources.push({ source, onNext });
    return this;
  }

  public get value(): T {
    return this.currentValue;
  }

  public set value(value: T) {
    this.currentValue = value;
    this.subscribers.forEach((subscriber) => subscriber(value));
  }

  subscribe(onNext: OnNext<T>): Unsubscribe {
    if (this.subscribers.has(onNext)) {
      throw new Error('Subscriber already subscribed');
    }
    this.subscribers.add(onNext);

    this.subscribeToAllSources();

    return () => {
      this.subscribers.delete(onNext);
      this.sources.forEach(({ unsubscribe }) => unsubscribe?.());
    };
  }

  private subscribeToAllSources() {
    this.sources.forEach(({ source, onNext }, index) => {
      const unsubscribe = source.subscribe((value) => {
        onNext(value);
      });
      this.sources[index].unsubscribe = unsubscribe;
    });
  }
}
