import { shouldUseModernDecorator } from '../../utils/decorators';
import { legacyDecorator } from './lateInject.legacy';
import { modernDecorator } from './lateInject.modern';

export function lateInject(name?: string): any {
  return (...args: any[]) => {
    return shouldUseModernDecorator(args) ?
      modernDecorator(name, args[0], args[1]) :
      legacyDecorator(name, args[0], args[1], args[2]);
  };
}
