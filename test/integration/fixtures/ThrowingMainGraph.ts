import { Graph, Provides } from '../../../src';
import MainGraph from './MainGraph';

@Graph()
export default class ThrowingMainGraph extends MainGraph {
  @Provides()
  override someString(): string {
    throw new Error('This graph has no valid providers');
  }
}
