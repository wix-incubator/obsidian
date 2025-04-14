import { useObserver } from 'react-obsidian';
import { type GameModel } from './gameModel';

export const useEntryViewModel = (index: number, model: GameModel) => {
  const [history] = useObserver(model.history);
  const onClick = () => {
    console.log('onClick', index);
  };
  return { text: history[index].text, onClick };
};
