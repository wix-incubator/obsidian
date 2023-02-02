import { ConstructorArgs } from './ConstructorArgs';

export default class InjectionMetadata {
  private readonly injectionMetadataKey = 'injectionMetadata';
  private readonly injectedConstructorArgsKey = 'injectedConstructorArgsKey';
  private readonly lateInjectionMetadataKey = 'lateInjectionMetadataKey';

  getConstructorArgsToInject(target: any): ConstructorArgs {
    return Reflect.getMetadata(this.injectedConstructorArgsKey, target) ?? new ConstructorArgs();
  }

  getPropertiesToInject(target: any): Set<string> {
    return this.getProperties(this.injectionMetadataKey, target);
  }

  getLatePropertiesToInject(target: any): Set<string> {
    return this.getProperties(this.lateInjectionMetadataKey, target);
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

  saveLatePropertyMetadata(target: any, property: string) {
    this.saveProperties(
      this.lateInjectionMetadataKey,
      this.getLatePropertiesToInject(target).add(property),
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
