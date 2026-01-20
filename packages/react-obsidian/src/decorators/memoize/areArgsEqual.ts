export type IsEqualFn = (newArgs: unknown[], lastArgs: unknown[]) => boolean;

export function areArgsEqual(newArgs: unknown[], lastArgs: unknown[]): boolean {
  if (newArgs.length !== lastArgs.length) {
    return false;
  }

  for (let i = 0; i < newArgs.length; i++) {
    if (!Object.is(newArgs[i], lastArgs[i])) {
      return false;
    }
  }

  return true;
}
