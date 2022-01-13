import { Constructable } from '../../types';
import { Graph } from '../../graph/Graph';
import graphRegistry from '../../graph/registry/GraphRegistry';
import ClassInjector from '../../injectors/class/ClassInjector';

export function Injectable(Graph: Constructable<Graph>): any {
  return new ClassInjector(graphRegistry).inject(Graph);
}
