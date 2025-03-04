export function getConstructorOrParentConstructor(ctor: any, parentName: string): any {
    const parent = Object.getPrototypeOf(ctor);
    if (parent.name === parentName) return ctor;
    return getConstructorOrParentConstructor(Object.getPrototypeOf(ctor), parentName);
}