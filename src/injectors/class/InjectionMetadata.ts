import { ConstructorArgs } from './ConstructorArgs';

export default class InjectionMetadata {
  private readonly injectionMetadataKey = 'injectionMetadata';
  private readonly injectedConstructorArgsKey = 'injectedConstructorArgsKey';
  private readonly lazyInjectionMetadataKey = 'lazyInjectionMetadataKey';

  getConstructorArgsToInject(target: any): ConstructorArgs {
    return Reflect.getMetadata(this.injectedConstructorArgsKey, target) ?? new ConstructorArgs();
  }

  getPropertiesToInject(target: any): Set<string> {
    return this.getProperties(this.injectionMetadataKey, target);
  }

  getLazyPropertiesToInject(target: any): Set<string> {
    return this.getProperties(this.lazyInjectionMetadataKey, target);
  }

  saveConstructorParamMetadata(target: any, paramName: string, index: number) {
    const argsToInject = this.getConstructorArgsToInject(target);
    argsToInject.add(paramName, index);
    Reflect.defineMetadata(
      this.injectedConstructorArgsKey,
      argsToInject,
      target,
    );
  }

  savePropertyMetadata(target: any, property: string) {
    this.saveProperties(
      this.injectionMetadataKey,
      this.getPropertiesToInject(target).add(property),
      target,
    );
  }

  saveLazyPropertyMetadata(target: any, property: string) {
    this.saveProperties(
      this.lazyInjectionMetadataKey,
      this.getLazyPropertiesToInject(target).add(property),
      target,
    );
  }

  private saveProperties(key: string, properties: Set<string>, target: any) {
    Reflect.defineMetadata(
      key,
      properties,
      target,
    );
  }

  private getProperties(key: string, target: any): Set<string> {
    return Reflect.getMetadata(key, target) ?? new Set();
  }
}
