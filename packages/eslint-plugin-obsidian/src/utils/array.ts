export function isEmpty(array?: any[]) {
  return array === undefined || array.length === 0;
}

export function toString(array: object[] = []) {
  return `[${array.map(a => a.toString()).join(', ')}]`;
}
