import InjectionMetadata from '../../injectors/class/InjectionMetadata';

export function LazyInject(name?: string): any {
  return (target: Object) => {
    const metadata = new InjectionMetadata();
    metadata.saveLazyPropertyMetadata(target.constructor, name!);
  };
}
