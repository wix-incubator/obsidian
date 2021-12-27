import _ from 'lodash';

/* eslint-disable no-param-reassign */
export function autobind(target: Record<string, any>) {
  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(target));
  methods
    .filter((method) => (method !== 'constructor'))
    .filter((method) => _.isFunction(target[method]))
    .forEach((method) => {
      target[method] = target[method].bind(target);
    });
}
