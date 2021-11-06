import { Constructable, Scope } from '@Obsidian';
import 'reflect-metadata';
import graphRegistry from './GraphRegistry';
import ObjectGraph from './ObjectGraph';

interface GraphParams {
  scope: Scope | undefined;
  subgraphs: Constructable<ObjectGraph>[];
}

export default function Graph({
  scope,
  subgraphs = [],
}: Partial<GraphParams> = {}) {
  return (constructor: Constructable<ObjectGraph>) => {
    Reflect.defineMetadata('scope', scope, constructor);
    graphRegistry.register(constructor, scope, subgraphs);
    return constructor;
  };
}
