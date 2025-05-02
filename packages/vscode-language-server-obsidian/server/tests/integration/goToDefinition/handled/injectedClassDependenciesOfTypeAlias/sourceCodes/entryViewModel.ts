import { useObserver } from 'react-obsidian';
import { GameModel } from './gameModel';

export const useEntryViewModel = (model: GameModel) => {
  const [history] = useObserver(model.history);
  const onClick = () => { };
  return { text: 'foo', onClick };
};
