import InjectionMetadata from '../../injectors/class/InjectionMetadata';

export function lateInject<This, Value>(name?: string): any {
  return (
    _target: undefined,
    context: ClassFieldDecoratorContext<This, Value>,
  ) => {
    context.addInitializer(function (this: This) {
      const metadata = new InjectionMetadata();
      metadata.saveLatePropertyMetadata((this as object).constructor, name!);
    });
  };
}
