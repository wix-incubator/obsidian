import { provides } from 'react-obsidian';
import { AbstractPortsGraph } from './abstractPortsGraph';

export abstract class AbstractApplicationGraph extends AbstractPortsGraph {
  @provides()
  fooService(leagueRepository: string) {
    return `service: ${leagueRepository}`;
  }
}
