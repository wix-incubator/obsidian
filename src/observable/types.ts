export type OnNext<T> = (value: T) => void;
export type Unsubscribe = () => void;

export interface Observable<T> {
  value: T;
  subscribe(onNext: OnNext<T>): Unsubscribe;
}

export type ObservedValues<T> = { [K in keyof T]: T[K] extends Observable<infer R> ? R : never };
