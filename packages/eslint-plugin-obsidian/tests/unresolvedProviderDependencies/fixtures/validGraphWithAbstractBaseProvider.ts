import { ObjectGraph, graph, provides } from 'react-obsidian';

abstract class PortsGraph extends ObjectGraph {
  abstract leagueRepository(): string;
}

@graph()
export default class AppGraph extends PortsGraph {
  leagueRepository() { return 'repo'; }

  @provides()
  useCase(leagueRepository: string): string {
    return leagueRepository;
  }
}
