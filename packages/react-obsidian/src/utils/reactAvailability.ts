let reactAvailableCache: boolean | undefined;

export function isReactAvailable(): boolean {
  if (reactAvailableCache !== undefined) {
    return reactAvailableCache;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, global-require
    require('react');
    reactAvailableCache = true;
  } catch {
    reactAvailableCache = false;
  }

  return reactAvailableCache;
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

/**
 * Creates a class constructor that throws an error when instantiated if React is not available.
 * Used for features like Model that need to be constructable.
 */
export function createReactRequiredClass<T = any>(className: string): T {
  return class ReactRequiredStub {
    constructor() {
      throw new Error(
        `${className} requires React to be installed. `
        + `Please install React: npm install react`,
      );
    }
  } as T;
}
