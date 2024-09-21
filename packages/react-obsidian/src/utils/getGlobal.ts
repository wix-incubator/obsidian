export function getGlobal(): any {
  return typeof window !== 'undefined' ? window : global;
}
