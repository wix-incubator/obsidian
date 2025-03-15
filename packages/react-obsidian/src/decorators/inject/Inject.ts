import InjectionMetadata from '../../injectors/class/InjectionMetadata';

export function inject(name?: string) {
  return (
    target: Object | any,
    _propertyKey?: string,
    _indexOrPropertyDescriptor?: number | PropertyDescriptor,
  ) => {
    const metadata = new InjectionMetadata();
      metadata.savePropertyMetadata(target.constructor, name!);
  };
}
