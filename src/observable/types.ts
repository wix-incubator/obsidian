export type OnNext<T> = (value: T) => void | undefined; // OnNext callbacks should never return a value
export type Unsubscribe = () => void;

export interface Observable<T> {
  value: T;
  subscribe(onNext: OnNext<T>): Unsubscribe;
}

export type ObservedValues<T> = { [K in keyof T]: T[K] extends Observable<infer R> ? R : never };
