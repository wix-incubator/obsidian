import { useContext, useState } from 'react';
import { GraphContext } from './graphContext';
import type { Constructable, ObjectGraph } from '../..';
import { uniqueId } from '../../utils/uniqueId';

export const useInjectionToken = (Graph: Constructable<ObjectGraph>) => {
  const ctx = useContext(GraphContext);
  const [injectionToken] = useState(() => ctx?.injectionToken ?? uniqueId(Graph.name));
  return injectionToken;
};
