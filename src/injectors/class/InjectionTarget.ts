export default class InjectTarget {
  private readonly injectionMetadataKey = 'injectionMetadata';
  private readonly injectedConstructorArgsKey = 'injectedConstructorArgsKey';

  getConstructorArgsToInject(target: any): Array<[string, number]> {
    return Reflect.getMetadata(this.injectedConstructorArgsKey, target) ?? [];
  }

  getPropertiesToInject(target: any): Set<string> {
    return Reflect.getMetadata(this.injectionMetadataKey, target) ?? new Set();
  }

  constructor(private target: any) {}

  saveConstructorParamMetadata(paramName: string, index: number) {
    const argsToInject = this.getConstructorArgsToInject(this.target);
    argsToInject.push([paramName, index]);
    Reflect.defineMetadata(
      this.injectedConstructorArgsKey,
      argsToInject,
      this.target,
    );
  }

  savePropertyMetadata(property: string) {
    Reflect.defineMetadata(
      this.injectionMetadataKey,
      this.getPropertiesToInject(this.target).add(property),
      this.target,
    );
  }
}
