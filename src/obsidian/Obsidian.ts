import { Constructable } from '@Obsidian';
import graphResolver from './GraphResolver';
import ObjectGraph from './ObjectGraph';

class Obsidian {
  obtain<T extends ObjectGraph<P>, P = any>(Graph: Constructable<T>, props?: P): T {
    return graphResolver.resolve(Graph, props);
  }
}

export default new Obsidian();
