import { useEffect, useState } from 'react';
import { Constructable } from '../../types';
import { ObjectGraph } from '../../graph/ObjectGraph';
import graphRegistry from '../../graph/registry/GraphRegistry';
import referenceCounter from '../../ReferenceCounter';

export default <P>(Graph: Constructable<ObjectGraph>, props?: Partial<P>) => {
  const [graph] = useState(graphRegistry.resolve(Graph, props));
  useEffect(() => {
    referenceCounter.retain(graph);
    return () => referenceCounter.release(graph, (g) => graphRegistry.clear(g));
  }, [graph]);
  return graph;
};
