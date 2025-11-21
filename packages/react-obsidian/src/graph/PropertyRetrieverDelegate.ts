import { CircularDependenciesDetector } from './CircularDependenciesDetector';

interface PropertyRetrieverDelegate {
  retrieve: (
    property: string,
    receiver?: unknown,
    circularDependenciesDetector?: CircularDependenciesDetector,
    includePrivate?: boolean
  ) => unknown | undefined;
}

export default PropertyRetrieverDelegate;
