import type { Result } from './result';

export class Success implements Result {
  readonly isError = false;

  getMessage(): string {
    throw new Error('Success should not have an error message');
  }
}
