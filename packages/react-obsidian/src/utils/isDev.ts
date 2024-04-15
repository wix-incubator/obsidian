export function isDev(): boolean {
  return isNodeDev() || isReactNativeDev();
}

function isNodeDev(): boolean {
  // eslint-disable-next-line @typescript-eslint/dot-notation
  return ['test', 'development'].includes(process.env['NODE_ENV'] ?? '');
}

function isReactNativeDev(): boolean {
  // @ts-ignore
  return __DEV__ as boolean ?? false;
}
