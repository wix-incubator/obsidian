import InjectionMetadata from '../../injectors/class/InjectionMetadata';

export function modernDecorator<This, Args extends any[], Return>(
  name: string | undefined,
  _target: (this: This, ...args: Args) => Return,
  context: { name: string | symbol; addInitializer: (callback: () => void) => void },
) {
  context.addInitializer(function initializer(this: any) {
    const metadata = new InjectionMetadata();
    metadata.savePropertyMetadata(this.constructor, name!);
  });
}