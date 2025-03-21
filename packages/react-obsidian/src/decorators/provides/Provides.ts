import { shouldUseModernDecorator } from '../../utils/decorators';
import { legacyDecorator } from './provides.legacy';
import { modernDecorator } from './provides.modern';

interface ProvidesParams {
  name: string;
}

export function provides({ name }: Partial<ProvidesParams> = {}) {
  return (...args: any[]) => {
    return shouldUseModernDecorator(args)
      ? modernDecorator(name, args[0], args[1])
      : legacyDecorator(name, args[0], args[1], args[2]);
  };
}
