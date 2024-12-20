/* eslint-disable unused-imports/no-unused-vars */
import { LifecycleBound, ObjectGraph } from 'src';

describe('custom scoped lifecycle-bound graphs', () => {
  it('should be able to use a custom scoped lifecycle-bound graph', () => {
    @LifecycleBound({scope: 'customScope'})
    class Temp extends ObjectGraph {
    }
  });
});
