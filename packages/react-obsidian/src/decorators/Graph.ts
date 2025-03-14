import { Constructable } from '../types';
import graphRegistry from '../graph/registry/GraphRegistry';
import { ObjectGraph } from '../graph/ObjectGraph';

interface GraphParams {
  subgraphs: Constructable<ObjectGraph>[];
}

export function graph({ subgraphs = [] }: Partial<GraphParams> = {}) {
  return (constructor: any) => {
    graphRegistry.register(constructor, subgraphs);
    return constructor;
  };
}
