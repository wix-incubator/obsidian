import InjectionMetadata from '../../injectors/class/InjectionMetadata';

export function LazyInject() {
  return (target: Object, propertyKey: string) => {
    const metadata = new InjectionMetadata();
    metadata.saveLazyPropertyMetadata(target.constructor, propertyKey);
  };
}
