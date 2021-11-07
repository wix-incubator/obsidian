import { Constructable } from '@Obsidian';
import graphResolver from './GraphResolver';
import ObjectGraph from './ObjectGraph';

export default class Obsidian {
  obtain<T extends ObjectGraph<P>, P = any>(Graph: Constructable<T>, props?: P): T {
    return graphResolver.resolve(Graph, props);
  }
}
