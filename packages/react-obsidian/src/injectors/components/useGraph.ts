import { useEffect, useState } from 'react';
import { Constructable } from '../../types';
import { ObjectGraph } from '../../graph/ObjectGraph';
import graphRegistry from '../../graph/registry/GraphRegistry';
import referenceCounter from '../../ReferenceCounter';

export default <P>(Graph: Constructable<ObjectGraph>, target: any, props?: Partial<P>) => {
  const [graph] = useState(() => {
    const resolvedGraph = graphRegistry.resolve(Graph, 'lifecycleOwner', props);
    resolvedGraph.onBind(target);
    return resolvedGraph;
  });
  useEffect(() => {
    referenceCounter.retain(graph);
    return () => referenceCounter.release(graph, (g) => graphRegistry.clear(g));
  }, [graph]);
  return graph;
};
