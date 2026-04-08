const cache = new Map<string, boolean>();

// Indirection makes require non-statically-analyzable so bundlers won't try to resolve the module name
// eslint-disable-next-line @typescript-eslint/no-require-imports, no-eval
const dynamicRequireFn: ((name: string) => any) | undefined = typeof require !== 'undefined'
  ? eval('require')
  : undefined;

export function isPackageAvailable(name: string): boolean {
  if (cache.has(name)) return cache.get(name)!;
  try {
    dynamicRequireFn?.(name);
    cache.set(name, !!dynamicRequireFn);
  } catch {
    cache.set(name, false);
  }
  return cache.get(name)!;
}

export function dynamicRequire(name: string): any {
  return dynamicRequireFn?.(name);
}
