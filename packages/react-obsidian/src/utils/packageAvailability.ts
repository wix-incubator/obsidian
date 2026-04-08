const cache = new Map<string, boolean>();

// Indirection makes require non-statically-analyzable so bundlers won't try to resolve the module name.
// eval is wrapped in try/catch to gracefully handle strict CSP environments.
function getDynamicRequireFn(): ((name: string) => any) | undefined {
  if (typeof require === 'undefined') {
    return undefined;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, no-eval
    return eval('require');
  } catch {
    return undefined;
  }
}

const dynamicRequireFn = getDynamicRequireFn();

export function isPackageAvailable(name: string): boolean {
  if (cache.has(name)) return cache.get(name)!;
  try {
    dynamicRequireFn?.(name);
    cache.set(name, true);
  } catch {
    cache.set(name, false);
  }
  return cache.get(name)!;
}

export function dynamicRequire(name: string): any {
  return dynamicRequireFn?.(name);
}
