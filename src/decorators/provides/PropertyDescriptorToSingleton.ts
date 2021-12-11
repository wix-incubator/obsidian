/* eslint-disable no-param-reassign */
export default function makeSingleton(descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalValue = descriptor.value;
  let createdDependency: any;
  descriptor.value = function value(...args: any[]) {
    if (createdDependency) return createdDependency;
    createdDependency = originalValue.apply(this, args);
    return createdDependency;
  };
  return descriptor;
}
