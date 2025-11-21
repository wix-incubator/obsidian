import { Constructor, Constructable } from '../types';
import graphRegistry from '../graph/registry/GraphRegistry';
import { ObjectGraph } from '../graph/ObjectGraph';

interface GraphParams {
  subgraphs: Constructable<ObjectGraph>[];
  privateSubgraphs: Constructable<ObjectGraph>[];
}

export function graph<Class extends Constructor>(
  { subgraphs = [], privateSubgraphs = [] }: Partial<GraphParams> = {},
) {
  return (Clazz: Class) => {
    graphRegistry.register(Clazz, subgraphs, privateSubgraphs);
    return Clazz;
  };
}
