export function singleton() {
  return function singleton(
    target: any, // Class extends Constructor || (this: This, ...args: Args) => Return
  ) {
    Reflect.defineMetadata('isSingleton', true, target);
    return target;

    // return function singleton(
    //   constructorOrGraph: Constructable<ObjectGraph> | ObjectGraph,
    //   _property?: string,
    //   descriptor?: PropertyDescriptor,
    // ): any {
    //   const target = descriptor || constructorOrGraph;
    //   Reflect.defineMetadata('isSingleton', true, target);
    //   return target;
    // };
  };
}

// function methodSingleton<This, Args extends any[], Return>(
//   target: (this: This, ...args: Args) => Return,
// ) {
//   Reflect.defineMetadata('isSingleton', true, target);
//   return target;
// }
