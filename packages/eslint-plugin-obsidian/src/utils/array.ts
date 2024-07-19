export function isEmpty(array: any[]) {
    return array.length === 0;
}

export function equals(a?: any[], b?: any[]) {
  return a && b && a.length === b.length && a.every((value, index) => value === b[index]);
}