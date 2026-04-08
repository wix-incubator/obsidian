import { isPackageAvailable } from './packageAvailability';

export function isReactAvailable(): boolean {
  return isPackageAvailable('react');
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
