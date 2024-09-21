import type { Result } from './result';

export class MissingTypeError implements Result {
  readonly isError = true;

  constructor(private readonly own: string[], private readonly injected: string[]) { }

  getMessage() {
    return `The call to injectComponent is missing prop types. It should be typed as: injectComponent<${this.getGenerics()}> `;
  }

  private getGenerics(): string {
    const own = this.own[0];
    const injected = this.injected[0];
    return own && injected ? `${own}, ${injected}` : own;
  }
}
