import { useContext, useState } from 'react';
import { GraphContext } from './graphContext';
import type { Constructable, ObjectGraph } from '../..';
import { uniqueId } from '../../utils/uniqueId';
import { isString } from '../../utils/isString';

export const useInjectionToken = (keyOrGraph: string | Constructable<ObjectGraph>) => {
  const ctx = useContext(GraphContext);
  const [injectionToken] = useState(() => {
    return ctx?.injectionToken ?? uniqueId(isString(keyOrGraph) ? keyOrGraph : keyOrGraph.name);
  });
  return injectionToken;
};
