/* eslint-disable no-underscore-dangle */
export type OnNext<T> = (value: T) => void;
type Unsubscribe = () => void;

export class Observable<T> {
  private subscribers: Set<OnNext<T>> = new Set();

  constructor(private _value: T) {}

  public get value(): T {
    return this._value;
  }

  public set value(value: T) {
    this._value = value;
    this.subscribers.forEach((subscriber) => subscriber(value));
  }

  public subscribe(onNext: OnNext<T>): Unsubscribe {
    if (this.subscribers.has(onNext)) {
      throw new Error('Subscriber already subscribed');
    }
    this.subscribers.add(onNext);
    return () => this.subscribers.delete(onNext);
  }
}
