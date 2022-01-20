import InjectionMetadata from '../../injectors/class/InjectionMetadata';

  return (target: object, propertyKey: string) => {
    const metadata = new InjectionMetadata();
    metadata.saveLazyPropertyMetadata(target.constructor, propertyKey);
  };
}
