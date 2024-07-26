import type { Type } from '../../../dto/types/type';
import type { Result } from './result';

export class MissingTypeError implements Result {
  readonly isError = true;

  constructor(private readonly missingTypes: Type[]) { }

  getMessage() {
    return `The call to injectComponent is missing prop types. It should be typed as: injectComponent<${this.missingTypes.map(t => t.toString()).join(', ')}> `;
  }
}