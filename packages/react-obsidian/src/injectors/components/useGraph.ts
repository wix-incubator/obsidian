import React, { useEffect, useState } from 'react';
import { Constructable } from '../../types';
import { ObjectGraph } from '../../graph/ObjectGraph';
import graphRegistry from '../../graph/registry/GraphRegistry';
import referenceCounter from '../../ReferenceCounter';

export default <P>(
  keyOrGraph: string | Constructable<ObjectGraph>,
  target: any,
  props?: Partial<P>,
  injectionToken?: string,
  containerRef?: React.RefObject<any>,
) => {

  const [graph] = useState(() => {
    const resolvedGraph = graphRegistry.resolve(keyOrGraph, 'lifecycleOwner', props, injectionToken);
    resolvedGraph.onBind(target);
    return resolvedGraph;
  });
  useEffect(() => {
    const sentinel = containerRef?.current;
    referenceCounter.retain(graph);
    return () => {
      const isCleanupCalledDueToActivityPause = graph.inactiveBehavior === 'retain' && sentinel?.isConnected;
      referenceCounter.release(graph, (g) => {
        if (!isCleanupCalledDueToActivityPause) {
          graphRegistry.clear(g);
        }
      });
    };
  }, [graph]);
  return graph;
};
