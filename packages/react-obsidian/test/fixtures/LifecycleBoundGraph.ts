import { graph, ObjectGraph, provides } from '../../src';
import { lifecycleBound } from '../../src/decorators/LifecycleBound';

export type Props = Record<string, any> & { stringFromProps: string };

@lifecycleBound() @graph()
export class LifecycleBoundGraph extends ObjectGraph<Props> {
  static timesCreated = 0;
  private props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
    LifecycleBoundGraph.timesCreated++;
  }

  @provides()
  computedFromProps(): string {
    return this.props.stringFromProps ?
      `A string passed via props: ${this.props.stringFromProps}` :
      'stringFromProps does not exist';
  }

  @provides()
  doesNotRequireProps(): string {
    return 'A string that does not require props';
  }
}
