import { CircularDependenciesDetector } from './CircularDependenciesDetector';

interface PropertyRetrieverDelegate {
  retrieve: (
    property: string,
    receiver?: unknown,
    circularDependencyDetector?: CircularDependenciesDetector
  ) => unknown | undefined;
}

export default PropertyRetrieverDelegate;
