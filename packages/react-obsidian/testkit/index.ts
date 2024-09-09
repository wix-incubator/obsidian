import { ObjectGraph } from '../src/graph/ObjectGraph';
import { Constructable } from '../src/types';
import { mockGraphs } from './mockGraphs';

class TestKit {
  /**
   * @deprecated testKit.mockGraphs is deprecated, use mockGraphs instead
   */
  public mockGraphs(graphNameToGraph: Record<string, Constructable<ObjectGraph> | ((props: any) => ObjectGraph)>) {
    // eslint-disable-next-line no-console
    console.warn('testKit.mockGraphs is deprecated, use mockGraphs instead');
    return mockGraphs(graphNameToGraph);
  }
}

export { mockModel } from './mockModel';
export { mockGraphs };

export const testKit = new TestKit();
