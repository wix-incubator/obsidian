import { graph, provides } from '../../src';
import MainGraph from './MainGraph';

@graph()
export default class ThrowingMainGraph extends MainGraph {
  @provides()
  override someString(): string {
    throw new Error('This graph has no valid providers');
  }
}
