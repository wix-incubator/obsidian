import { Constructable } from '../types';
import 'reflect-metadata';
import graphRegistry from '../graph/registry/GraphRegistry';
import { ObjectGraph } from '../graph/ObjectGraph';

interface GraphParams {
  subgraphs: Constructable<ObjectGraph>[];
}

export function Graph({
  subgraphs = [],
}: Partial<GraphParams> = {}) {
  return <T extends ObjectGraph>(constructor: Constructable<T>) => {
    graphRegistry.register(constructor, subgraphs);
    return constructor;
  };
}
