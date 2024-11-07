import { Singleton, Graph, ObjectGraph, Provides } from 'react-obsidian';

@Singleton()
@Graph()
export class DependencyGraph extends ObjectGraph {
  // @Provides({ name: 'hello' })
  @Provides()
  hello(): string {
    return 'hello';
  }
}
