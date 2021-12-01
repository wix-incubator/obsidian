import { Constructable, ServiceLocator } from '@Obsidian';
import graphRegistry from './graph/registry/GraphRegistry';
import ObjectGraph from './graph/ObjectGraph';
import { GraphCreator } from './graph/registry/GraphCreator';

export default class Obsidian {
  obtain<T extends ObjectGraph<P>, P = any>(Graph: Constructable<T>, props?: P): ServiceLocator<T> {
    return graphRegistry.resolve(Graph, props) as unknown as ServiceLocator<T>;
  }

  setGraphCreator(creator: GraphCreator) {
    graphRegistry.setGraphCreator(creator);
  }

  clearGraphCreator() {
    graphRegistry.clearGraphCreator();
  }
}
