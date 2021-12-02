import { Constructable } from '@Obsidian';
import Graph from '../Graph';

export interface GraphResolver {
  resolve<T extends Graph, Props>(resolveChain: ResolveChain, Graph: Constructable<T>, props?: Props): T;
}

export interface ResolveChain {
  proceed<T extends Graph, Props>(Graph: Constructable<T>, props?: Props): T;
}
