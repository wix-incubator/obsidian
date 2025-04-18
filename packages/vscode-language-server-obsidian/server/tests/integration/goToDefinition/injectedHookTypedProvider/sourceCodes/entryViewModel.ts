import { useObserver } from 'react-obsidian';
import { GameModel } from './gameModel';

export type EntryViewModel = () => ReturnType<typeof useEntryViewModel>;

export const useEntryViewModel = (model: GameModel) => {
  const [history] = useObserver(model.history);
  const onClick = () => { };
  return { text: 'foo', onClick };
};
