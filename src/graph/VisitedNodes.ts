export class VisitedNodes {
  private visitedNodes = new Set<string>();

  public visit(graphName: string, dependencyName: string) {
    this.visitedNodes.add(`${graphName}.${dependencyName}`);
  }

  public canVisit(graphName: string, dependencyName: string) {
    return !this.visitedNodes.has(`${graphName}.${dependencyName}`);
  }
}
