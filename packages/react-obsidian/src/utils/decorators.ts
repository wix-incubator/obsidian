export function shouldUseModernDecorator(args: any[]) {
  return args.length === 2 && typeof args[1] === 'object' && 'addInitializer' in args[1];
}
