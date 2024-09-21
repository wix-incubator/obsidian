import { defineMetadata } from '../utils/reflect';

export function singleton() {
  return function singleton(
    target: any, // Class extends Constructor || (this: This, ...args: Args) => Return
  ) {
    defineMetadata(target, 'isSingleton', true);
    return target;
  };
}
