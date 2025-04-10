import { SourceCode } from "../../..";

export const entryPoint: SourceCode = {
  path: '/model/themeGraph.ts',
  content: `import { graph, ObjectGraph, provides, singleton } from 'react-obsidian';
import { ThemeModel } from '../../presentation/model/ThemeModel';
import { ApplyDarkModeUseCase } from '../../presentation/useCases/applyDarkModeUseCase';
import { FrameworkGraph } from '../../framework/di/FrameworkGraph';
import { type Window } from '../../framework/Window';

@singleton() @graph({ subgraphs: [FrameworkGraph] })
export class ThemeGraph extends ObjectGraph {

  @provides()
  foo(bar: string, baz: string) {
    return \`foo: \${ bar } \${ baz }\`;
  }

  @provides()
  bar() {
    return 'bar';
  }

  @provides()
  baz() {
    return 'baz';
  }
}
`
};
