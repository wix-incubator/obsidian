import { Observable } from '../Observable';
import { MediatorObservable } from './MediatorObservable';

const NOOP = () => {};

describe('MediatorObservable', () => {
  let uut!: MediatorObservable<number>;

  beforeEach(() => {
    uut = new MediatorObservable();
  });

  it('should be defined', () => {
    expect(MediatorObservable).toBeDefined();
  });

  it('should be instantiable', () => {
    expect(uut).toBeInstanceOf(MediatorObservable);
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

    a.value = 1;
    expect(uut.value).toEqual(1);
    b.value = 2;
    expect(uut.value).toEqual(2);
    c.value = -1;
    expect(uut.value).toEqual(-2);
  });

  it('should continue observing sources even if there are no subscribers', () => {
    const a = new Observable<number>();
    uut.addSource(a, (nextA) => { uut.value = nextA; });

    const unsubscribe = uut.subscribe(NOOP);
    unsubscribe();
    a.value = 10;
    expect(uut.value).toEqual(10);
  });

  it('should throw an error if a subscriber is already subscribed', () => {
    const subscriber = () => {};
    uut.subscribe(subscriber);
    expect(() => uut.subscribe(subscriber)).toThrow('Subscriber already subscribed');
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

    a.value = 1;
    expect(uut.value).toEqual(1);
    b.value = '2';
    expect(uut.value).toEqual(2);
  });

  it('should support chaining addSource calls', () => {
    const a = new Observable();
    const b = new Observable();

    uut.addSource(a, NOOP).addSource(b, NOOP);
  });

  it('supports passing initial value in through the constructor', () => {
    const mediator = new MediatorObservable(1);
    expect(mediator.value).toEqual(1);
  });

  it('should subscribe to sources immediately', () => {
    const a = new Observable(1);
    uut.addSource(a, (nextA) => {
      uut.value = nextA * 2;
    });

    a.value = 3;
    expect(uut.value).toEqual(6);
  });

  it('should execute addSource callbacks immediately to create an initial value', () => {
    const a = new Observable(1);
    uut.addSource(a, (nextA) => {
      uut.value = nextA * 2;
    });

    expect(uut.value).toEqual(2);
  });

  it('should support mapping other observables', () => {
    const o = new Observable(3);
    const uut2 = new MediatorObservable()
      .mapSource(o, (next) => {
        return next * 2;
      });
    expect(uut2.value).toEqual(6);
  });

  it('should support mapping other observables with an initial value', () => {
    const o = new Observable(3);
    const uut2 = new MediatorObservable(5)
      .mapSource(o, (next, currentValue) => {
        return next * currentValue;
      });
    expect(uut2.value).toEqual(15);
  });

  it('should support mapping multiple observables', () => {
    const a = new Observable(2);
    const b = new Observable(3);
    const uut2 = new MediatorObservable(5)
      .mapSource(a, (next, currentValue) => next * currentValue)
      .mapSource(b, (next, currentValue) => next * currentValue);
    expect(uut2.value).toEqual(30);
  });

  it('should support observing multiple observables', () => {
    const a = new Observable(true);
    const b = new Observable(3);
    const c = new Observable('bar');

    const uut2 = new MediatorObservable('foo')
      .mapSources([a, b, c], ([nextA, nextB, nextC], currentValue) => {
        return `${currentValue} ${nextA.toString().repeat(nextB)} ${nextC}`;
      });

    expect(uut2.value).toEqual('foo truetruetrue bar');
  });

  it('should call the mapSources callback only once on initialization', () => {
    const a = new Observable(1);
    const b = new Observable(2);
    const mapFn = jest.fn();

    uut.mapSources([a, b], mapFn);

    expect(mapFn).toHaveBeenCalledOnce();
  });

  it('should call the mapSources callback when a source updates', () => {
    const a = new Observable(1);
    const b = new Observable(2);
    const mapFn = jest.fn();

    uut.mapSources([a, b], mapFn);
    a.value = 2;

    expect(mapFn).toHaveBeenCalledTimes(2);
  });

  it('should invoke mapSources with the updated array from the previous invocation', () => {
    const A = new Observable(1);
    const B = new Observable(2);
    const uut2 = new MediatorObservable(0);

    uut2.mapSources([A, B], ([a, b]) => a + b);
    A.value = 3;
    B.value = 4;

    expect(uut2.value).toBe(7);
  });

  it('should invoke mapSources only if value has changed', () => {
    const A = new Observable(1);
    const B = new Observable(2);
    const uut2 = new MediatorObservable(0);
    const mapFn = jest.fn();

    uut2.mapSources([A, B], mapFn);
    A.value = 1;
    A.value = 3;

    expect(mapFn).toHaveBeenCalledTimes(2);
  });

  describe('addSources', () => {
    let A: Observable<number>;
    let B: Observable<number>;

    beforeEach(() => {
      A = new Observable(1);
      B = new Observable(2);
    });

    it('should support observing multiple observables', () => {
      uut.addSources([A, B], ([a, b]) => {
        uut.value = a + b;
      });

      expect(uut.value).toBe(3);
    });

    it('should shallow compare current and next values to reduce re-renders', () => {
      const onNext = jest.fn();

      uut.addSources([A, B], onNext);
      A.value = 1;

      expect(onNext).toHaveBeenCalledOnce();
    });

    it('should invoke onNext when an observable changes', () => {
      const onNext = jest.fn();

      uut.addSources([A, B], onNext);
      A.value = 11;

      expect(onNext).toHaveBeenCalledTimes(2);
    });

    it('should throw when a null source is passed', () => {
      const strUut = new MediatorObservable<string>();
      const strA = new Observable<string>('hello');
      const strB = new Observable<string>('world');

      expect(() => {
        // @ts-expect-error testing runtime behavior with null source
        strUut.addSources([null, strA, strB], ([, a, b]) => {
          strUut.value = `${a} ${b}`;
        });
      }).toThrow('addSources: source at index 0 is null or undefined');
    });

    it('should call onNext when source updates after emitting undefined', () => {
      const onNext = jest.fn();

      uut.addSources([A, B], onNext);
      onNext.mockClear();

      // @ts-expect-error intentionally setting to undefined to expose bug
      A.value = undefined;
      A.value = 5;

      expect(onNext).toHaveBeenCalledTimes(2);
    });

    it('should call onNext when an uninitialized source emits its first value', () => {
      const C = new Observable<number>();
      const onNext = jest.fn();

      uut.addSources([A, C], onNext);
      onNext.mockClear();

      C.value = 42;

      expect(onNext).toHaveBeenCalledTimes(1);
      expect(onNext).toHaveBeenCalledWith([1, 42]);
    });

    it('should NOT call onNext when no source has an initial value', () => {
      const C = new Observable<number>();
      const D = new Observable<number>();
      const onNext = jest.fn();

      uut.addSources([C, D], onNext);

      expect(onNext).not.toHaveBeenCalled();
    });

    it('should NOT allow undefined values to flow to the onNext callback', () => {
      const C = new Observable<number>();
      const D = new Observable<number>();

      let capturedValues: any;
      uut.addSources([C, D], (values) => { capturedValues = values; });

      expect(capturedValues).toBeUndefined();
    });
  });

  describe('mapSources', () => {
    it('should call mapNext when source updates after emitting undefined', () => {
      const A = new Observable<number>(10);
      const B = new Observable<number>(20);
      const mapFn = jest.fn().mockImplementation(([a, b]) => (a ?? 0) + (b ?? 0));

      uut.mapSources([A, B], mapFn);
      mapFn.mockClear();

      // @ts-expect-error intentionally setting to undefined to expose bug
      A.value = undefined;
      A.value = 5;

      expect(mapFn).toHaveBeenCalledTimes(2);
    });

    it('should call mapNext when an uninitialized source emits its first value', () => {
      const A = new Observable(5);
      const B = new Observable<number>();
      const mapFn = jest.fn().mockImplementation(([a, b = 0]) => a + b);

      const $uut = new MediatorObservable().mapSources([A, B], mapFn);

      B.value = 3;

      expect(mapFn).toHaveBeenCalledTimes(1);
      expect($uut.value).toBe(8);
    });

    it('should NOT call mapNext when some sources are uninitialized', () => {
      const A = new Observable(5);
      const B = new Observable<number>();
      const mapFn = jest.fn().mockImplementation(([a, b]) => a + b);

      new MediatorObservable<number>().mapSources([A, B], mapFn);

      expect(mapFn).not.toHaveBeenCalled();
    });

    it('should not produce NaN when mapNext receives a partially-initialized array', () => {
      const A = new Observable<number>(5);
      const B = new Observable<number>();

      const uut2 = new MediatorObservable<number>()
        .mapSources([A, B], ([a, b]) => a + b);

      expect(Number.isNaN(uut2.value)).toBe(false);
    });
  });
});
