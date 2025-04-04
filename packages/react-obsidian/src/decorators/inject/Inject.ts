import { shouldUseModernDecorator } from '../../utils/decorators';
import { legacyDecorator } from './inject.legacy';
import { modernDecorator } from './inject.modern';

export function inject(name?: string) {
  return (...args: any[]) => {
    return shouldUseModernDecorator(args) ?
      modernDecorator(name, args[0], args[1]) :
      legacyDecorator(name, args[0], args[1], args[2]);
  };
}
