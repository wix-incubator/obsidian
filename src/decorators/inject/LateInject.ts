import InjectionMetadata from '../../injectors/class/InjectionMetadata';

export function LateInject(name?: string): any {
  return (target: object) => {
    const metadata = new InjectionMetadata();
    metadata.saveLatePropertyMetadata(target.constructor, name!);
  };
}
