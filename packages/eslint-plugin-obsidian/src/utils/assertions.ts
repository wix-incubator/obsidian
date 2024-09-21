export function assertDefined<T>(obj: T, message?: string): asserts obj is NonNullable<T> {
  if (!obj) throw new Error(message || 'Expected object to exist');
}
