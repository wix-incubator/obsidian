export type OnNext<T> = (value: T) => void | undefined; // OnNext callbacks should never return a value

export type OnMultiNext<S1, S2, S3, S4, S5> = ([S1, S2, S3, S4, S5]: Args<S1, S2, S3, S4, S5>) => void | undefined;

export type Mapper<Other, Mine> = (next: Other, currentValue: Mine) => Mine extends void ?
  'A map function must return a value. Check your map function and ensure it has a valid return statement.' :
  Mine;
export type Unsubscribe = () => void;

export interface Observable<T> {
  value: T;
  subscribe(onNext: OnNext<T>): Unsubscribe;
}

export type ObservedValues<T> = { [K in keyof T]: T[K] extends Observable<infer R> ? R : never };

export type MultiMapper<Mine, S1, S2, S3, S4, S5> = (
  [S1, S2, S3, S4, S5]: Args<S1, S2, S3, S4, S5>,
  currentValue: Mine,
) => Mine;

export type Observables<S1, S2, S3, S4, S5> =
  [Observable<S1>, Observable<S2>] |
  [Observable<S1>, Observable<S2>, Observable<S3>] |
  [Observable<S1>, Observable<S2>, Observable<S3>, Observable<S4>] |
  [Observable<S1>, Observable<S2>, Observable<S3>, Observable<S4>, Observable<S5>];

export type Args<A1, A2, A3, A4, A5> =
  [A1, A2] |
  [A1, A2, A3] |
  [A1, A2, A3, A4] |
  [A1, A2, A3, A4, A5];
