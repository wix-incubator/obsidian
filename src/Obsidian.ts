import { Constructable, ServiceLocator } from '@Obsidian';
import graphRegistry from './graph/registry/GraphRegistry';
import ObjectGraph from './graph/ObjectGraph';
import { GraphResolver } from './graph/registry/interfaces';

export default class Obsidian {
  obtain<T extends ObjectGraph<P>, P = any>(Graph: Constructable<T>, props?: P): ServiceLocator<T> {
    return graphRegistry.resolve(Graph, props) as unknown as ServiceLocator<T>;
  }

  addGraphResolver(resolver: GraphResolver) {
    graphRegistry.addGraphResolver(resolver);
  }

  clearGraphResolvers() {
    graphRegistry.clearGraphResolvers();
  }
}
