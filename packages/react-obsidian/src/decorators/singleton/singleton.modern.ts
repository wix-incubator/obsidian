import {Reflect} from '../../utils/reflect';

export function modernDecorator<This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
): any {
  Reflect.defineMetadata('isSingleton', true, target);
  return target;
}