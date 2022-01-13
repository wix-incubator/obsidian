export default class InjectionMetadata {
  private readonly injectionMetadataKey = 'injectionMetadata';
  private readonly injectedConstructorArgsKey = 'injectedConstructorArgsKey';

  getConstructorArgsToInject(target: any): Array<[string, number]> {
    return Reflect.getMetadata(this.injectedConstructorArgsKey, target) ?? [];
  }

  getPropertiesToInject(target: any): Set<string> {
    return Reflect.getMetadata(this.injectionMetadataKey, target) ?? new Set();
  }

  saveConstructorParamMetadata(target: any, paramName: string, index: number) {
    const argsToInject = this.getConstructorArgsToInject(target);
    argsToInject.push([paramName, index]);
    Reflect.defineMetadata(
      this.injectedConstructorArgsKey,
      argsToInject,
      target,
    );
  }

  savePropertyMetadata(target: any, property: string) {
    Reflect.defineMetadata(
      this.injectionMetadataKey,
      this.getPropertiesToInject(target).add(property),
      target,
    );
  }
}
