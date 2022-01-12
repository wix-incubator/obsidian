import { isNumber } from 'lodash';
import InjectionTarget from '../../injectors/class/InjectionTarget';

export function Inject(name?: string) {
  return (
    target: Object | any,
    propertyKey?: string,
    indexOrPropertyDescriptor?: number | PropertyDescriptor,
  ) => {
    if (name && isNumber(indexOrPropertyDescriptor)) {
      new InjectionTarget(target).saveConstructorParamMetadata(name!, indexOrPropertyDescriptor);
    } else {
      new InjectionTarget(target.constructor).savePropertyMetadata(propertyKey!);
    }
  };
}
