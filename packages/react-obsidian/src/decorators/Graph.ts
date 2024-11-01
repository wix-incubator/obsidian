import { Constructable, type Constructor } from '../types';
import graphRegistry from '../graph/registry/GraphRegistry';
import { ObjectGraph } from '../graph/ObjectGraph';

interface GraphParams {
  subgraphs: Constructable<ObjectGraph>[];
}

export function graph<Class extends Constructor>({ subgraphs = [] }: Partial<GraphParams> = {}) {
  return (Clazz: Class) => {
    graphRegistry.register(Clazz, subgraphs);
    return Clazz;
  };
}
