import { Graph, ObjectGraph, Provides } from '../../src';
import { LifecycleBound } from '../../src/decorators/LifecycleBound';

export type Props = Record<string, any> & { stringFromProps: string };

@LifecycleBound() @Graph()
export class LifecycleBoundGraph extends ObjectGraph<Props> {
  static timesCreated = 0;
  private props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
    LifecycleBoundGraph.timesCreated++;
  }

  @Provides()
  computedFromProps(): string {
    return this.props.stringFromProps
      ? `A string passed via props: ${this.props.stringFromProps}`
      : 'stringFromProps does not exist';
  }

  @Provides()
  doesNotRequireProps(): string {
    return 'A string that does not require props';
  }
}
