export function nonNull<T>(value: T): value is NonNullable<typeof value> {
  return value !== undefined;
}
