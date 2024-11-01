import { Constructable } from '../../types';
import { Graph } from '../../graph/Graph';
import graphRegistry from '../../graph/registry/GraphRegistry';
import ClassInjector from '../../injectors/class/ClassInjector';

export function injectable(keyOrGraph: string | Constructable<Graph>): any {
  return new ClassInjector(graphRegistry).inject(keyOrGraph);
}
