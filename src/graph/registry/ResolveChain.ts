import { Constructable } from '../../types';

export interface ResolveChain<T> {
  proceed<Props = any>(Graph: Constructable<T>, props?: Props): T;
}
