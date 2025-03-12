import {Reflect} from '../utils/reflect';

type Options = {
  scope?: 'component' | 'feature' | (string & {});
};

export function lifecycleBound(options?: Options) {
  return (constructor: any) => {
    Reflect.defineMetadata('isLifecycleBound', true, constructor);
    Reflect.defineMetadata('lifecycleScope', options?.scope ?? 'feature', constructor);
    return constructor;
  };
}
