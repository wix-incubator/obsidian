const cache = new Map<string, boolean>();

export function isPackageAvailable(name: string): boolean {
  if (cache.has(name)) return cache.get(name)!;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, global-require
    require(name);
    cache.set(name, true);
  } catch {
    cache.set(name, false);
  }
  return cache.get(name)!;
}
