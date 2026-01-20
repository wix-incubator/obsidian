import { modernDecorator } from './memoize.modern';
import { legacyDecorator } from './memoize.legacy';
import { shouldUseModernDecorator } from '../../utils/decorators';
import { areArgsEqual, type IsEqualFn } from './areArgsEqual';

export type MemoizeOptions = {
  isEqual?: IsEqualFn;
};

export function memoize(options?: MemoizeOptions): any {
  const isEqual = options?.isEqual ?? areArgsEqual;

  return (...args: any[]) => {
    return shouldUseModernDecorator(args)
      ? modernDecorator(args[0], args[1], isEqual)
      : legacyDecorator(args[0], args[1], args[2], isEqual);
  };
}
