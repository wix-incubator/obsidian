import { defineMetadata } from '../utils/reflect';

type Options = {
  scope?: 'component' | 'feature' | (string & {});
};

export function lifecycleBound(options?: Options) {
  return (constructor: any) => {
    defineMetadata(constructor, 'isLifecycleBound', true);
    defineMetadata(constructor, 'lifecycleScope', options?.scope ?? 'feature');
    return constructor;
  };
}
