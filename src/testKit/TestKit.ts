import { Constructable } from '@Obsidian';
import Graph from 'src/graph/Graph';
import graphRegistry from '../GraphRegistry';

export class TestKit {
  replaceGraph<T extends Graph>(original: Constructable<T>, double: Constructable<T>) {
    graphRegistry.replace(original, double);
  }
}

export default new TestKit();
