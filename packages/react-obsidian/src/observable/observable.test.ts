import { Observable } from './Observable';
import { OnNext } from './types';

describe('makeObservable', () => {
  it('should make observable', () => {
    const obj = {};
    const observable = new Observable(obj);
    expect(observable).toBeInstanceOf(Observable);
  });

  it('should expose the observed value', () => {
    const obj = {};
    const observable = new Observable(obj);
    expect(observable.value).toBe(obj);
  });

  it('should be observable', () => {
    const observable = new Observable({});
    let observedValue: any = null;
    observable.subscribe((value) => {
      observedValue = value;
    });
    expect(observedValue).toBe(null);
    const newValue = {};
    observable.value = newValue;
    expect(observedValue).toBe(newValue);
  });

  it('should be observable with multiple subscribers', () => {
    const observable = new Observable({});
    let observedValue1: any = null;
    let observedValue2: any = null;
    observable.subscribe((value) => {
      observedValue1 = value;
    });
    observable.subscribe((value) => {
      observedValue2 = value;
    });
    expect(observedValue1).toBe(null);
    expect(observedValue2).toBe(null);
    const newValue = {};
    observable.value = newValue;
    expect(observedValue1).toBe(newValue);
    expect(observedValue2).toBe(newValue);
  });

  it('should subscribe only once', () => {
    const observable = new Observable({});
    const subscriber = () => { void 0; };
    observable.subscribe(subscriber);
    expect(() => observable.subscribe(subscriber)).toThrow('Subscriber already subscribed');
  });

  it('should unsubscribe', () => {
    const observable = new Observable(0);
    let value = 0;
    const subscriber: OnNext<number> = (next: number) => {
      value = next;
    };
    observable.subscribe(subscriber);
    expect(value).toBe(0);

    observable.value = 1;
    expect(value).toBe(1);

    observable.unsubscribe(subscriber);
    observable.value = 2;
    expect(value).toBe(1);
  });

  it('should throw error because the subscriber is not subscribed', () => {
    const observable = new Observable({});
    const subscriber = () => { void 0; };
    expect(() => observable.unsubscribe(subscriber)).toThrow(`Can't unsubscribe, subscriber doesn't exist`);
  });

  it('should await the current value', async () => {
    const observable = new Observable(123);
    expect(await observable.first()).toBe(123);
  });

  it('should await the next value', async () => {
    const observable = new Observable<number>();
    const promise = observable.first();
    observable.value = 123;
    observable.value = 456;
    expect(await promise).toBe(123);
  });
});
