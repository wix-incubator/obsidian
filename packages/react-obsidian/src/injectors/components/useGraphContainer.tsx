import React, { forwardRef, PropsWithChildren } from 'react';
import { ObjectGraph } from '../../graph/ObjectGraph';
import { isReactNativeAvailable } from '../../utils/reactNativeAvailability';
import { dynamicRequire } from '../../utils/packageAvailability';

const isRN = isReactNativeAvailable();
const Element: any = isRN ? dynamicRequire('react-native').View : 'div';

const RetainContainer = forwardRef<any, PropsWithChildren>((props, ref) => (
  <Element ref={ref} style={isRN ? undefined : { display: 'contents' }}>{props.children}</Element>
));

const PassthroughContainer = forwardRef<any, PropsWithChildren>((props) => (
  <>{props.children}</>
));

export default function useGraphContainer(graph: ObjectGraph) {
  return graph.inactiveBehavior === 'retain' ? RetainContainer : PassthroughContainer;
}
