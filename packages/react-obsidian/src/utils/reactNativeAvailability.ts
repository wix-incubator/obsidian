import { isPackageAvailable } from './packageAvailability';

let cache: boolean | undefined;

export function isReactNativeAvailable(): boolean {
  if (cache !== undefined) return cache;
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    cache = true;
    return cache;
  }
  cache = isPackageAvailable('react-native');
  return cache;
}
