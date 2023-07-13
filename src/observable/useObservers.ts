/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { Observable } from './Observable';
import { MediatorObservable } from './MediatorObservable';

export function useObservers<A, B>(a: Observable<A>, b: Observable<B>): [A, B];
export function useObservers<A, B, C>(a: Observable<A>, b: Observable<B>, c: Observable<C>): [A, B, C];
export function useObservers<A, B, C, D>(a: Observable<A>, b: Observable<B>, c: Observable<C>, d: Observable<D>): [A, B, C, D];
export function useObservers<A, B, C, D, E>(a: Observable<A>, b: Observable<B>, c: Observable<C>, d: Observable<D>, e: Observable<E>): [A, B, C, D, E];
export function useObservers<A, B, C, D, E, F>(a: Observable<A>, b: Observable<B>, c: Observable<C>, d: Observable<D>, e: Observable<E>, f: Observable<F>): [A, B, C, D, E, F];
export function useObservers<A, B, C, D, E, F, G>(a: Observable<A>, b: Observable<B>, c: Observable<C>, d: Observable<D>, e: Observable<E>, f: Observable<F>, g: Observable<G>): [A, B, C, D, E, F, G];

export function useObservers(...observables: Observable<any>[]): any[] {
  const [values, setValues] = useState(() => observables.filter((o) => o !== undefined).map((o) => o.value));

  useEffect(() => {
    const mediator = new MediatorObservable();
    observables.filter((o) => o).map((o, index) => mediator.addSource(o, () => {
      const nextValues = [...values];
      nextValues[index] = o.value;
      setValues(nextValues);
    }));

    return mediator.subscribe();
  }, []);

  return values;
}
