import React, { forwardRef } from 'react';

const style = { position: 'absolute' as const, width: 0, height: 0, overflow: 'hidden' as const };

const Sentinel = forwardRef<any>((_, ref) => (
  <div ref={ref} style={style} />
));

export default Sentinel;
