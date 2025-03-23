import InjectionMetadata from '../../injectors/class/InjectionMetadata';

export function legacyDecorator(
  name: string | undefined,
  target: Object | any,
  propertyKey: string,
  _indexOrPropertyDescriptor?: number | PropertyDescriptor,
) {
  const metadata = new InjectionMetadata();
  metadata.saveLatePropertyMetadata(target.constructor, name ?? propertyKey);
}