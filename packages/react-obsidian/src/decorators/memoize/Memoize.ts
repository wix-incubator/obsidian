import { modernDecorator } from './memoize.modern';
import { legacyDecorator } from './memoize.legacy';
import { shouldUseModernDecorator } from '../../utils/decorators';

export function memoize(): any {
  return (...args: any[]) => {
    return shouldUseModernDecorator(args)
      ? modernDecorator(args[0], args[1])
      : legacyDecorator(args[0], args[1], args[2]);
  };
}
