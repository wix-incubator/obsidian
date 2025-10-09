import { graph, ObjectGraph, provides } from 'react-obsidian';

@graph()
class GraphA extends ObjectGraph {
  fromGraphA = 'from GraphA';

  @provides()
  firstDep(): string {
    return 'only {this.fromGraphA}';
  }

  @provides()
  secondDep(): string {
    return this.fromGraphA;
  }
}

@graph()
export class GraphB extends GraphA {
  private fromGraphB = 'from GraphB';

  @provides()
  override secondDep(): string {
    return 'overriding {this.fromGraphB}';
  }

  @provides()
  thirdDep(): string {
    return this.fromGraphB;
  }
}
