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
    referenceCounter.retain(graph);
    return () => {
      const isCleanupCalledDueToActivityPause = containerRef?.current;
      if (isCleanupCalledDueToActivityPause) return;
      referenceCounter.release(graph, (g) => graphRegistry.clear(g));
    };
  }, [graph]);
  return graph;
};
