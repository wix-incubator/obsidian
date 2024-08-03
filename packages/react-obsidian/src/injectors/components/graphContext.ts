import { createContext } from 'react';

interface Context {
  injectionToken: string;
}

export const GraphContext = createContext<Context | undefined>(undefined);
