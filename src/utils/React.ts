import React, { FunctionComponent } from 'react';

type MemoizedComponent = React.MemoExoticComponent<FunctionComponent<any>> & {
  compare?: (prevProps: any, nextProps: any) => boolean;
};
export function isMemoizedComponent(component: FunctionComponent<any>): component is MemoizedComponent {
  return (component as MemoizedComponent).type !== undefined;
}

export function genericMemo<C extends React.ComponentType<any>>(
  Component: Parameters<typeof React.memo>[0],
  propsAreEqual?: Parameters<typeof React.memo>[1],
) {
  return React.memo(Component, propsAreEqual) as unknown as C;
}
