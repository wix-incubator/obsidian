let cache: boolean | undefined;

export function isReactNativeAvailable(): boolean {
  if (cache !== undefined) return cache;
  cache = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
  return cache;
}
