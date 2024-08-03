import { Graph, ObjectGraph } from '../../src';
import { LifecycleBound } from '../../src/decorators/LifecycleBound';

export type Props = Record<string, any> & { stringFromProps: string };

@LifecycleBound({scope: 'component'}) @Graph()
export class ScopedLifecycleBoundGraph extends ObjectGraph<Props> {

}
