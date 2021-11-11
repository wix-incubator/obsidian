import { Scope } from '@Obsidian';
import providedPropertiesStore from './ProvidedPropertiesStore';

function Provides(scope?: Scope) {
  return function provide(_clazz: any, propertyKey: string, descriptor: PropertyDescriptor) {
    providedPropertiesStore.set(_clazz, propertyKey);
    return descriptor;
  };
}
export default Provides;
