import { defineMetadata, getMetadata } from '../../utils/reflect';
import { ConstructorArgs } from './ConstructorArgs';

export default class InjectionMetadata {
  private readonly injectionMetadataKey = 'injectionMetadata';
  private readonly injectedConstructorArgsKey = 'injectedConstructorArgsKey';
  private readonly lateInjectionMetadataKey = 'lateInjectionMetadataKey';

  getConstructorArgsToInject(target: any): ConstructorArgs {
    return getMetadata(target, this.injectedConstructorArgsKey) ?? new ConstructorArgs();
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
    defineMetadata(
      target,
      this.injectedConstructorArgsKey,
      argsToInject,
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
    defineMetadata(
      target,
      key,
      properties,
    );
  }

  private getProperties(key: string, target: any): Set<string> {
    return getMetadata(target, key) ?? new Set();
  }
}
