import { graph, ObjectGraph, lifecycleBound } from '../../src';

export type Props = Record<string, any> & { stringFromProps: string };

@lifecycleBound({scope: 'component'}) @graph()
export class ScopedLifecycleBoundGraph extends ObjectGraph<Props> {

}
