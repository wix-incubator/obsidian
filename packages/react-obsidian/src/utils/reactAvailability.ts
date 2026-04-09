let cache: boolean | undefined;

export function isReactAvailable(): boolean {
  if (cache !== undefined) return cache;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, global-require
    require('react');
    cache = true;
  } catch {
    cache = false;
  }
  return cache;
}

/**
 * Creates a function that throws an error when called if React is not available.
 * Used to provide helpful error messages for React-dependent features.
 */
export function createReactRequiredError<T = any>(featureName: string): T {
  return function reactRequiredStub(..._args: any[]) {
    throw new Error(
      `${featureName} requires React to be installed. `
      + `Please install React: npm install react`,
    );
  } as T;
}
