import { Model, Observable } from 'react-obsidian';

export default class GameModel extends Model {
  public readonly history = new Observable<History[]>([]);
}
