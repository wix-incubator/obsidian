import { Constructable, ServiceLocator } from '@Obsidian';
import graphRegistry from './GraphRegistry';
import ObjectGraph from './ObjectGraph';

export default class Obsidian {
  obtain<T extends ObjectGraph<P>, P = any>(Graph: Constructable<T>, props?: P): ServiceLocator<T> {
    return graphRegistry.resolve(Graph, props) as unknown as ServiceLocator<T>;
  }
}
