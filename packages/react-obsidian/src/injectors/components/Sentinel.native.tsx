import React, { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-require-imports, global-require
const { View } = require('react-native');

const style = { position: 'absolute' as const, width: 0, height: 0, overflow: 'hidden' as const };

const Sentinel = forwardRef<any>((_, ref) => (
  <View ref={ref} collapsable={false} style={style} />
));

export default Sentinel;
