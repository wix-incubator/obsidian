/* eslint-disable no-param-reassign */
export function autobind(target: Record<string, any>) {
  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(target));
  methods
    .filter((method) => (method !== 'constructor'))
    .forEach((method) => { target[method] = target[method].bind(target); });
}
