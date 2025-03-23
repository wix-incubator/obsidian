import { modernDecorator } from './singleton.modern';
import { legacyDecorator } from './singleton.legacy';
import { shouldUseModernDecorator } from '../../utils/decorators';

export function singleton() {
  return (...args: any[]) => {
    return shouldUseModernDecorator(args) ?
      modernDecorator(args[0]) :
      legacyDecorator(args[0], args[1], args[2]);
  };
}
