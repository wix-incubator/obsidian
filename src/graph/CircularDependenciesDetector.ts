import { VisitedNodes } from './VisitedNodes';

export class CircularDependenciesDetector {
  private visitedNodes = new VisitedNodes();
  private circularDependencyDetected = false;

  public visit(graphName: string, dependencyName: string) {
    this.visitedNodes.visit(graphName, dependencyName);
  }

  public checkForCircularDependencies(graphName: string, dependencyName: string): boolean {
    const canVisit = this.visitedNodes.canVisit(graphName, dependencyName);
    if (!canVisit) this.circularDependencyDetected = true;
    return canVisit;
  }

  public hasCircularDependencies(): boolean {
    return this.circularDependencyDetected;
  }
}
