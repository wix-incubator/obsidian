import { Graph } from '../graph/Graph';

export type Constructable<T> = {
  new(...args: any): T;
};

export type Constructor = { new(...args: any[]): any };

export type ServiceLocator<Clazz> = {
  [Key in keyof Clazz]: () => Clazz[Key] extends (...args: any[]) => infer R ? R : never;
};

export type GraphInternals = 'retrieve' | 'name' | 'scope';

export type DependenciesOf<G, Dependencies extends keyof DependenciesOf<G> = never> =
  Partial<Dependencies> extends never ?
    DependenciesOfInternal<G> :
    Pick<DependenciesOfInternal<G>, Dependencies>;

type DependenciesOfInternal<G> = G extends Graph ?
  DependenciesOf1<G> :
  G extends any[] ?
    DependenciesOfN<G> :
    never;

type DependenciesOfN<Graphs extends any[]> =
  Graphs extends [infer G, ...infer R] ?
    DependenciesOf1<G> & DependenciesOfN<R> :
    unknown;

type DependenciesOf1<Graph> = {
  [Key in keyof Omit<Graph, GraphInternals>]: Graph[Key] extends (...args: any[]) => infer R ? R : never;
};
