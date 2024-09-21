import type { Type } from '../../../dto/types/type';
import { toString } from '../../../utils/array';
import type { Result } from './result';

export class RedundantTypeError implements Result {
  readonly isError = true;

  constructor(private readonly redundantType: Type[]) { }

  getMessage() {
    return `injectComponent has one or more redundant types: ${toString(this.redundantType)}.`;
  }
}
