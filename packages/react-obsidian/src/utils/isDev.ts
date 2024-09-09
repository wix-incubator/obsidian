export function isDev(): boolean {
  return isNodeDev() || isReactNativeDev();
}

function isNodeDev(): boolean {
  return ['test', 'development'].includes(process.env['NODE_ENV'] ?? '');
}

function isReactNativeDev(): boolean {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return __DEV__ as boolean ?? false;
}
