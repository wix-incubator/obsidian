import { isNumber } from 'lodash';

const injectionMetadataKey = 'injectionMetadata';
const injectedConstructorArgsKey = 'injectedConstructorArgsKey';

export function Inject(name?: string) {
  return (
    target: Object | any,
    propertyKey?: string,
    indexOrPropertyDescriptor?: number | PropertyDescriptor,
  ) => {
    if (name && isNumber(indexOrPropertyDescriptor)) {
      const constructorArgsToInject = Reflect.getMetadata(
        injectedConstructorArgsKey,
        target,
      ) ?? new Array<[string, number]>();
      constructorArgsToInject.push([name, indexOrPropertyDescriptor]);
      Reflect.defineMetadata(
        injectedConstructorArgsKey,
        constructorArgsToInject,
        target,
      );
    } else {
      const keysToInject = Reflect.getMetadata(injectionMetadataKey, target.constructor) ?? new Set();
      Reflect.defineMetadata(injectionMetadataKey, keysToInject.add(propertyKey), target.constructor);
    }
  };
}
