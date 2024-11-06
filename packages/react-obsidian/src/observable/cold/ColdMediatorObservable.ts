import { Observable } from '../Observable';
import { MediatorObservable } from '../mediator/MediatorObservable';
import { OnNext } from '../types';
export class ColdMediatorObservable<T extends object> extends MediatorObservable<T> {
  constructor(obj: T, private readonly handler = new PropertyAccessTrackingProxy<T>()) {
    super(new Proxy(obj, handler));
  }

  override set value(_: T) {
    throw new Error('Cannot set value of ColdMediatorObservable, use setValue(value, key) instead');
  }

  override get value(): T {
    return super.value;
  }

  setValue(key: keyof T, value: any) {
    if (this.handler.hasAccessedProperty(key)) {
      this.handler.suspendTracking();
      super.value = { ...this.value, [key]: value };
      this.handler.resumeTracking();
    }
  }

  override addSource<S>(source: Observable<S>, onNext: OnNext<S>) {
    source.subscribe(onNext);
    return this;
  }
}

class PropertyAccessTrackingProxy<T extends object> implements ProxyHandler<T> {
  private readonly accessedProperties = new Set<keyof T>();
  private trackingSuspended = false;

  get(target: T, p: string | symbol, receiver: any) {
    if (!this.trackingSuspended) {
      this.accessedProperties.add(p as keyof T);
    }
    return Reflect.get(target, p, receiver);
  }

  hasAccessedProperty(key: keyof T) {
    return this.accessedProperties.has(key);
  }

  public suspendTracking() {
    this.trackingSuspended = true;
  }

  public resumeTracking() {
    this.trackingSuspended = false;
  }
}
