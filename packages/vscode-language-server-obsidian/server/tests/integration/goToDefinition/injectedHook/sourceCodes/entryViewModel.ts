export const entryViewModelContent = `import { useObserver } from 'react-obsidian';
import { type GameModel } from '../../../core/model/GameModel';

export const useEntryViewModel = (index: number, model: GameModel) => {
  const [history] = useObserver(model.history);
  const onClick = () => model.onHistoryEntryClick(index);
  return { text: history[index].text, onClick };
};`