import { Constructable } from '@Obsidian';
import Graph from '../Graph';

export interface GraphCreator {
  create<T extends Graph, Props>(Graph: Constructable<T>, props?: Props): T;
}

export class ObsidianGraphCreator implements GraphCreator {
  create<T extends Graph, Props>(Graph: Constructable<T>, props: Props): T {
    return new Graph(props);
  }
}
