import { SourceCode } from "../../..";

export const gameGraph: SourceCode = {
  path: '../../../core/di/GameGraph.ts',
  content: `import { Graph, ObjectGraph, Provides, Singleton } from 'react-obsidian';
import { GameModel } from '../model/GameModel';
import { CalculateWinnerUseCase } from '../usecases/CalculateWinnerUseCase';

@Singleton() @Graph()
export class GameGraph extends ObjectGraph {
  @Provides()
  model(): GameModel {
    return new GameModel(new CalculateWinnerUseCase());
  }
}`}