import { FunctionComponent } from 'react';

type MemoizedComponent = React.MemoExoticComponent<FunctionComponent<any>>;
export function isMemoizedComponent(component: FunctionComponent<any>): component is MemoizedComponent {
  return (component as MemoizedComponent).type !== undefined;
}
