import { VisitedNodes } from './VisitedNodes';

export class CircularDependenciesDetector {
  private visitedNodes = new VisitedNodes();

  constructor(public graphName: string) {}

  public visit(graphName: string, dependencyName: string): boolean {
    return this.visitedNodes.visit(graphName, dependencyName);
  }

  public hasCircularDependencies(): boolean {
    return this.visitedNodes.isCircularPath();
  }

  public getDependencies(): string[] {
    return this.visitedNodes.getNodes();
  }

  public get firstDependencyName(): string {
    return this.visitedNodes.getNodes()[0];
  }
}
