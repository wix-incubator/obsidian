export class VisitedNodes {
  private visitedNodes = new Set<`${string}.${string}`>();
  private visitPath: string[] = [];

  public visit(graphName: string, dependencyName: string): boolean {
    this.visitPath.push(dependencyName);
    if (this.canVisit(graphName, dependencyName)) {
      this.visitedNodes.add(`${graphName}.${dependencyName}`);
      return true;
    }
    return false;
  }

  public canVisit(graphName: string, dependencyName: string) {
    return !this.visitedNodes.has(`${graphName}.${dependencyName}`);
  }

  public isCircularPath(): boolean {
    return this.visitedNodes.size < this.visitPath.length;
  }

  getNodes(): string[] {
    return this.visitPath;
  }
}
