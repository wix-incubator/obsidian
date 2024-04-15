export function LifecycleBound() {
  return (constructor: any) => {
    Reflect.defineMetadata('isLifecycleBound', true, constructor);
    return constructor;
  };
}
