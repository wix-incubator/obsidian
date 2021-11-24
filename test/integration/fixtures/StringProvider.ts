import injectedValues from './injectedValues';

export default class StringProvider {
  constructor(public readonly theString: string = injectedValues.fromStringProvider) { }
}
