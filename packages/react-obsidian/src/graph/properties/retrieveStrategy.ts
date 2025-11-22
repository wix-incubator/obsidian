import { CircularDependenciesDetector } from '../CircularDependenciesDetector';

export interface RetrieveStrategy {
  retrieve: (
    property: string,
    circularDependenciesDetector: CircularDependenciesDetector,
    receiver: unknown,
  ) => unknown | undefined;
}