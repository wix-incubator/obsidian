import graphRegistry from './GraphRegistry';
import IObjectGraph from './IObjectGraph';

export default class PropertyRetriever {
  constructor(private target: IObjectGraph) { }

  retrieve(property: string, receiver?: unknown): unknown | undefined {
    if (property in this) {
      return Reflect.get(this, property, receiver);
    }
    const results = this.getFromSubgraphs(property, receiver);
    if (results.length === 1) return results[0];
    // TODO Support named providers and update the error message by suggesting to use a named provider
    if (results.length > 1) throw new Error(`Multiple subgraphs provide the property ${property}.`);
    return undefined;
  }

  private getFromSubgraphs(property: string, receiver: unknown): unknown[] {
    const subgraphs = graphRegistry.getSubgraphs(this.target);
    return subgraphs
      .map((subgraph) => subgraph.get(property, receiver))
      .filter((result) => result !== undefined);
  }
}
