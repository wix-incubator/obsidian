import InjectionMetadata from '../../injectors/class/InjectionMetadata';

export function LazyInject(name?: string) {
  return (target: object, propertyKey: string) => {
    const metadata = new InjectionMetadata();
    metadata.saveLazyPropertyMetadata(target.constructor, name ?? propertyKey);
  };
}
