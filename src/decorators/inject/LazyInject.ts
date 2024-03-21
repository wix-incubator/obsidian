import InjectionMetadata from '../../injectors/class/InjectionMetadata';

export function LazyInject(name?: string) {
  return (
    target: Object | any,
    _propertyKey?: string,
    _indexOrPropertyDescriptor?: number | PropertyDescriptor,
  ) => {
    const metadata = new InjectionMetadata();
    metadata.saveLazyPropertyMetadata(target.constructor, name!);
  };
}
