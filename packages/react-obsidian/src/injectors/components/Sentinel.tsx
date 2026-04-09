import React, { forwardRef } from 'react';
import { isReactNativeAvailable } from '../../utils/reactNativeAvailability';

const isRN = isReactNativeAvailable();
// eslint-disable-next-line @typescript-eslint/no-require-imports, global-require
const Element: any = isRN ? require('react-native').View : 'div';
const style = { position: 'absolute' as const, width: 0, height: 0, overflow: 'hidden' as const };

const Sentinel = forwardRef<any>((_, ref) => (
  <Element ref={ref} collapsable={false} style={style} />
));

export default Sentinel;
