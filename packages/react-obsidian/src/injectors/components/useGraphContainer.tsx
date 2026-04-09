import React, { forwardRef, PropsWithChildren } from 'react';
import { ObjectGraph } from '../../graph/ObjectGraph';
import { isReactNativeAvailable } from '../../utils/reactNativeAvailability';

const isRN = isReactNativeAvailable();
// eslint-disable-next-line @typescript-eslint/no-require-imports, global-require
const Sentinel: any = isRN ? require('react-native').View : 'div';

const sentinelStyle = { position: 'absolute' as const, width: 0, height: 0, overflow: 'hidden' as const };

const RetainContainer = forwardRef<any, PropsWithChildren>((props, ref) => (
  <>
    <Sentinel ref={ref} collapsable={false} style={sentinelStyle} />
    {props.children}
  </>
));

const PassthroughContainer = forwardRef<any, PropsWithChildren>((props, _ref) => (
  <>{props.children}</>
));

export default function useGraphContainer(graph: ObjectGraph) {
  return graph.inactiveBehavior === 'retain' ? RetainContainer : PassthroughContainer;
}
