import { useObserver } from 'react-obsidian';

export const useEntryViewModel = (index: number, model: any) => {
  const [history] = useObserver(model.history);
  const onClick = () => model.onHistoryEntryClick(index);
  return { text: 'foo', onClick };
};