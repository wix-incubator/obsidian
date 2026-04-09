import React, { forwardRef, PropsWithChildren } from 'react';
import { ObjectGraph } from '../../graph/ObjectGraph';
import { isReactNativeAvailable } from '../../utils/reactNativeAvailability';

const isRN = isReactNativeAvailable();
// eslint-disable-next-line @typescript-eslint/no-require-imports, global-require
const Element: any = isRN ? require('react-native').View : 'div';

const RetainContainer = forwardRef<any, PropsWithChildren>((props, ref) => (
  <Element ref={ref} style={isRN ? undefined : { display: 'contents' }}>{props.children}</Element>
));

const PassthroughContainer = forwardRef<any, PropsWithChildren>((props) => (
  <>{props.children}</>
));

export default function useGraphContainer(graph: ObjectGraph) {
  return graph.inactiveBehavior === 'retain' ? RetainContainer : PassthroughContainer;
}
