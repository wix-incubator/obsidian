import { Observable } from './Observable';
import { ObservableMediator } from './ObservableMediator';

const NOOP = () => {};

describe('ObservableMediator', () => {
  let uut!: ObservableMediator<number>;

  beforeEach(() => {
    uut = new ObservableMediator();
  });

  it('should be defined', () => {
    expect(ObservableMediator).toBeDefined();
  });

  it('should be instantiable', () => {
    expect(uut).toBeInstanceOf(ObservableMediator);
  });

  it('should have a value property', () => {
    uut.value = 1;
    expect(uut.value).toBeDefined();
  });

  it('should have a value property that can be set', () => {
    uut.value = 1;
    expect(uut.value).toEqual(1);
  });

  it('should have a value property that can be set to a different value', () => {
    uut.value = 1;
    uut.value = 2;
    expect(uut.value).toEqual(2);
  });

  it('should support observing other observables', () => {
    const observable = new Observable(1);
    uut.addSource(observable, (next: number) => {
      uut.value = next;
    });

    let value!: number;
    uut.subscribe((next) => {
      value = next;
    });
    observable.value = 2;
    expect(value).toEqual(2);
    expect(uut.value).toEqual(2);
  });

  it('should support observing other observables and transforming the value', () => {
    const a = new Observable<number>();
    const b = new Observable<number>();
    const c = new Observable<number>();

    uut.addSource(a, (nextA) => {
      uut.value = nextA;
    });
    uut.addSource(b, (nextB) => {
      uut.value *= nextB;
    });
    uut.addSource(c, (nextC) => {
      uut.value *= nextC;
    });

    uut.subscribe(() => {});
    a.value = 1;
    expect(uut.value).toEqual(1);
    b.value = 2;
    expect(uut.value).toEqual(2);
    c.value = -1;
    expect(uut.value).toEqual(-2);
  });

  it('should unsubscribe from all sources when unsubscribed', () => {
    const a = new Observable<number>();
    const b = new Observable<number>();

    uut.addSource(a, NOOP);
    uut.addSource(b, NOOP);

    const unsubscribe = uut.subscribe(NOOP);
    unsubscribe();
    expect(Reflect.get(a, 'subscribers').size).toEqual(0);
    expect(Reflect.get(b, 'subscribers').size).toEqual(0);
  });

  it('should throw an error if a subscriber is already subscribed', () => {
    const subscriber = () => {};
    uut.subscribe(subscriber);
    expect(() => uut.subscribe(subscriber)).toThrowError(
      'Subscriber already subscribed',
    );
  });

  it('should mediate between observers of different types', () => {
    const a = new Observable<number>();
    const b = new Observable<string>();

    uut.addSource(a, (nextA: number) => {
      uut.value = nextA;
    });
    uut.addSource(b, (nextB) => {
      uut.value = parseInt(nextB, 10);
    });

    uut.subscribe(() => {});
    a.value = 1;
    expect(uut.value).toEqual(1);
    b.value = '2';
    expect(uut.value).toEqual(2);
  });
});
