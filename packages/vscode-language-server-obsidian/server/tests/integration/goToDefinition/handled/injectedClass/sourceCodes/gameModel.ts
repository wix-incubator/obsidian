import { Model, Observable } from 'react-obsidian';

export class GameModel extends Model {
  public readonly history = new Observable<{ text: string; }[]>([]);
}
