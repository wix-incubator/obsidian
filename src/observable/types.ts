export type OnNext<T> = (value: T) => void | undefined; // OnNext callbacks should never return a value
export type Mapper<Other, Mine> = (next: Other, currentValue: Mine) => Mine extends void ?
  'A map function must return a value. Check your map function and ensure it has a valid return statement.' :
  Mine;
export type Unsubscribe = () => void;

export interface Observable<T> {
  value: T;
  subscribe(onNext: OnNext<T>): Unsubscribe;
}

export type ObservedValues<T> = { [K in keyof T]: T[K] extends Observable<infer R> ? R : never };
