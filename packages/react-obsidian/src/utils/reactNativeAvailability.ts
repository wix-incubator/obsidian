let cache: boolean | undefined;

export function isReactNativeAvailable(): boolean {
  if (cache !== undefined) return cache;
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    cache = true;
    return cache;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, global-require
    require('react-native');
    cache = true;
  } catch {
    cache = false;
  }
  return cache;
}
