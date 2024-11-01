import InjectionMetadata from '../../injectors/class/InjectionMetadata';

export function inject<This, Return>(name?: string) {
  return (_target: undefined, context: ClassFieldDecoratorContext<This, Return>) => {
    context.addInitializer(function (this: This) {
      const metadata = new InjectionMetadata();
      metadata.savePropertyMetadata((this as object).constructor, name!);
    });

    return function (this: This, value: Return) {
      return value;
    };
  };
}
