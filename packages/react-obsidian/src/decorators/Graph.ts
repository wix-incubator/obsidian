import { AbstractConstructor, Constructable } from '../types';
import graphRegistry from '../graph/registry/GraphRegistry';
import { ObjectGraph } from '../graph/ObjectGraph';

interface GraphParams {
  subgraphs: Constructable<ObjectGraph>[];
  privateSubgraphs: Constructable<ObjectGraph>[];
}

export function graph<Class extends AbstractConstructor>(
  { subgraphs = [], privateSubgraphs = [] }: Partial<GraphParams> = {},
) {
  return (Clazz: Class) => {
    graphRegistry.register(Clazz as unknown as Constructable<ObjectGraph>, subgraphs, privateSubgraphs);
    return Clazz;
  };
}
