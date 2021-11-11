export const SOME_STRING = 'Fear kills progress';

export class StringProvider {
  constructor(public readonly theString: string = SOME_STRING) { }
}
