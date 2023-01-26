import { Observable } from './Observable';

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
    const subscriber = () => {};
    observable.subscribe(subscriber);
    expect(() => observable.subscribe(subscriber)).toThrowError('Subscriber already subscribed');
  });
  it('should unsubscribe', () => {
    const observable = new Observable({});
    const subscriber = () => { };
    observable.subscribe(subscriber);
    observable.unsubscribe(subscriber);
    expect(observable).toEqual(new Observable({}));
  });
  it('should throw error because the subscriber is not in the observable', () => {
    const observable = new Observable({});
    const subscriber = () => { };
    expect(() => observable.unsubscribe(subscriber)).toThrowError('Subscribe do not exists');
  });
});
