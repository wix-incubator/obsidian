import { Observable } from '../Observable';
import { ColdMediatorObservable } from './ColdMediatorObservable';

describe('ColdMediatorObservable', () => {
  let fooObservable: Observable<number>;
  let barObservable: Observable<string>;
  let uut: ColdMediatorObservable<{ foo: number; bar: string }>;

  beforeEach(() => {
    fooObservable = new Observable(1);
    barObservable = new Observable('bar');
    uut = new ColdMediatorObservable({ foo: 1, bar: 'bar' })
      .addSource(fooObservable, (nextFoo) => {
        uut.setValue('foo', nextFoo);
      })
      .addSource(barObservable, (nextBar) => {
        uut.setValue('bar', nextBar);
      });
  });

  it('should be observable', () => {
    const onNext = jest.fn();
    uut.subscribe(onNext);
    expect(uut.value.foo).toBe(1);

    fooObservable.value = 2;

    expect(uut.value.foo).toBe(2);
  });

  it('should call subscribers only if a requested value changed', () => {
    const onNext = jest.fn();
    uut.subscribe(onNext);

    fooObservable.value = 2; // foo is updated, but it is not requested by subscribers
    expect(onNext).toHaveBeenCalledTimes(0);
  });
});
