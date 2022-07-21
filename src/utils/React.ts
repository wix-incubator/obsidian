import { FunctionComponent } from 'react';

type MemoizedComponent = React.MemoExoticComponent<FunctionComponent<any>> & {
  compare?: (prevProps: any, nextProps: any) => boolean;
};
export function isMemoizedComponent(component: FunctionComponent<any>): component is MemoizedComponent {
  return (component as MemoizedComponent).type !== undefined;
}
