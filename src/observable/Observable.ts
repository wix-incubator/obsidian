import { Observable as IObservable, OnNext, Unsubscribe } from './types';

export class Observable<T> implements IObservable<T> {
  private subscribers: Set<OnNext<T>> = new Set();
  private currentValue: T | undefined;

  constructor(initialValue?: T) {
    this.currentValue = initialValue;
  }

  public get value(): T {
    return this.currentValue as T;
  }

  public set value(value: T) {
    this.currentValue = value;
    this.subscribers.forEach((subscriber) => subscriber(value));
  }

  async first(): Promise<T> {
    if (this.currentValue) return this.currentValue;
    return new Promise((resolve) => {
      const unsubscribe = this.subscribe((value) => {
        unsubscribe();
        resolve(value);
      });
    });
  }

  public subscribe(onNext: OnNext<T>): Unsubscribe {
    if (this.subscribers.has(onNext)) {
      throw new Error('Subscriber already subscribed');
    }
    this.subscribers.add(onNext);
    return () => this.subscribers.delete(onNext);
  }

  public unsubscribe(onNext:OnNext<T>) {
    if (!this.subscribers.has(onNext)) {
      throw new Error(`Can't unsubscribe, subscriber doesn't exist`);
    }
    this.subscribers.delete(onNext);
  }
}
