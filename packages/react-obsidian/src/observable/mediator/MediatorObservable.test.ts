import { Observable } from '../Observable';
import { MediatorObservable } from './MediatorObservable';

const NOOP = () => { void 0; };

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
    const subscriber = () => { void 0; };
    uut.subscribe(subscriber);
    expect(() => uut.subscribe(subscriber)).toThrow(
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

    a.value = 1;
    expect(uut.value).toEqual(1);
    b.value = '2';
    expect(uut.value).toEqual(2);
  });

  it('should support chaining addSource calls', () => {
    const a = new Observable(0);
    const b = new Observable(0);

    uut
      .addSource(a, (nextA) => {
        uut.value = (uut.value ?? 0) + nextA;
      })
      .addSource(b, (nextB) => {
        uut.value = (uut.value ?? 0) + nextB * 10;
      });

    a.value = 2;
    b.value = 3;
    expect(uut.value).toEqual(32);
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
  });
});
