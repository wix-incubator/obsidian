import { ObjectGraph } from 'react-obsidian';

export abstract class AbstractPortsGraph extends ObjectGraph {
  abstract leagueRepository(): string;
}
