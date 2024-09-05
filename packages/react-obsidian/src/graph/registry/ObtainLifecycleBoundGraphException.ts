import { isDev } from '../../utils/isDev';
import { Constructable } from '../../types';
import { Graph } from '../Graph';

export class ObtainLifecycleBoundGraphException extends Error {
  constructor(graph: Constructable<Graph>) {
    super(ObtainLifecycleBoundGraphException.createMessage(graph));
  }

  private static createMessage(graph: Constructable<Graph>): string {
    const graphName = isDev() ? ` ${graph.name}` : '';
    return `Tried to obtain a @LifecycleBound graph${graphName}, but it was not created yet. `
      + '@LifecycleBound graphs can only be obtained after they were created by a React component or hook.';
  }
}
