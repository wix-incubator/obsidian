import { graph, ObjectGraph } from '../../src';
import { lifecycleBound } from '../../src/decorators/LifecycleBound';

export type Props = Record<string, any> & { stringFromProps: string };

@lifecycleBound({ scope: 'component' }) @graph()
export class ScopedLifecycleBoundGraph extends ObjectGraph<Props> {

}
