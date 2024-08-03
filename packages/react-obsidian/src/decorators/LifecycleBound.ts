type Options = {
  scope?: 'component' | 'feature';
};

export function LifecycleBound(options?: Options) {
  return (constructor: any) => {
    Reflect.defineMetadata('isLifecycleBound', true, constructor);
    Reflect.defineMetadata('lifecycleScope', options?.scope ?? 'feature', constructor);
    return constructor;
  };
}
