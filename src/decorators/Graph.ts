import 'reflect-metadata';
import graphRegistry from '../graph/registry/GraphRegistry';
import ObjectGraph from '../graph/ObjectGraph';

interface GraphParams {
  scope: Scope | undefined;
  subgraphs: Constructable<ObjectGraph>[];
}

export default function Graph({
  scope,
  subgraphs = [],
}: Partial<GraphParams> = {}) {
  return <T extends ObjectGraph>(constructor: Constructable<T>) => {
    Reflect.defineMetadata('scope', scope, constructor);
    graphRegistry.register(constructor, scope, subgraphs);
    return constructor;
  };
}
