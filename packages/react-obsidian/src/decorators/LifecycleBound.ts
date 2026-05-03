import {Reflect} from '../utils/reflect';

type Options = {
  scope?: 'component' | 'feature' | (string & {});
  inactiveBehavior?: 'unmount' | 'retain';
};

export function lifecycleBound(options?: Options) {
  return (constructor: any) => {
    Reflect.defineMetadata('isLifecycleBound', true, constructor);
    Reflect.defineMetadata('lifecycleScope', options?.scope ?? 'feature', constructor);
    Reflect.defineMetadata('inactiveBehavior', options?.inactiveBehavior ?? 'retain', constructor);
    return constructor;
  };
}
