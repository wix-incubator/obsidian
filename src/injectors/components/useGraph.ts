import { Constructable } from '@Obsidian';
import { useEffect, useState } from 'react';
import ObjectGraph from 'src/ObjectGraph';
import graphRegistry from '../../GraphRegistry';
import referenceCounter from '../../ReferenceCounter';

export default <P>(Graph: Constructable<ObjectGraph>, props: Partial<P>) => {
  const [graph] = useState(graphRegistry.resolve(Graph, props));
  useEffect(() => {
    referenceCounter.retain(graph);
    return () => referenceCounter.release(graph, (g) => graphRegistry.clear(g));
  }, [graph]);
  return graph;
};
