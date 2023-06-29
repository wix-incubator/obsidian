let idCounter = 0;

export function uniqueId(prefix?: string): string {
  const id = ++idCounter;
  return `${prefix ?? ''}${id}`;
}
