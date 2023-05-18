import { CircularDependenciesDetector } from './CircularDependenciesDetector';

interface PropertyRetrieverDelegate {
  retrieve: (
    property: string,
    receiver?: unknown,
    circularDependenciesDetector?: CircularDependenciesDetector
  ) => unknown | undefined;
}

export default PropertyRetrieverDelegate;
