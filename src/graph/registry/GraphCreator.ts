import { Constructable } from '@Obsidian';
import Graph from '../Graph';
import ObjectGraph from '../ObjectGraph';

export interface GraphCreator {
  create<T extends ObjectGraph, Props>(Graph: Constructable<T>, props?: Props): T;
}

export class ObsidianGraphCreator implements GraphCreator {
  create<T extends ObjectGraph, Props>(Graph: Constructable<T>, props: Props): T {
    return new Graph(props);
  }
}
