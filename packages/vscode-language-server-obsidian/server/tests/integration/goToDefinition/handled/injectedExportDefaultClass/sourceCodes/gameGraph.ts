import { graph, ObjectGraph, provides, singleton } from 'react-obsidian';
import GameModel from './gameModel';

@singleton() @graph()
export class GameGraph extends ObjectGraph {
  @provides()
  model(): GameModel {
    return new GameModel();
  }
}
