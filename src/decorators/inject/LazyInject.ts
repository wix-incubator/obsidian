import InjectionMetadata from '../../injectors/class/InjectionMetadata';

export function LazyInject(name?: string): any {
  return (target: object) => {
    const metadata = new InjectionMetadata();
    metadata.saveLazyPropertyMetadata(target.constructor, name!);
  };
}
