export type OnNext<T> = (value: T) => void;
export type Unsubscribe = () => void;

export interface Observable<T> {
  value: T;
  subscribe(onNext: OnNext<T>): Unsubscribe;
}
