import { isNumber } from '../../utils/isNumber';
import InjectionMetadata from '../../injectors/class/InjectionMetadata';

export function inject(name?: string) {
  return (
    target: Object | any,
    _propertyKey?: string,
    indexOrPropertyDescriptor?: number | PropertyDescriptor,
  ) => {
    const metadata = new InjectionMetadata();
    if (isNumber(indexOrPropertyDescriptor)) {
      metadata.saveConstructorParamMetadata(target, name!, indexOrPropertyDescriptor);
    } else {
      metadata.savePropertyMetadata(target.constructor, name!);
    }
  };
}
