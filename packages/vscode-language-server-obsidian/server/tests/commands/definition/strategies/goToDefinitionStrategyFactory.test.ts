import { mock } from "jest-mock-extended";
import { StrategyFactory } from "../../../../src/commands/definition/strategies/goToDefinitionStrategyFactory";
const ts = require('typescript') as typeof import('typescript');
import { findNodeByText } from "../../../../src/utils/node";
import { HookStrategy } from "../../../../src/commands/definition/strategies/hookStrategy";

const HOOK_PARAMETER = `import { type DependenciesOf, injectComponent } from 'react-obsidian';

export type Props = {
  index: number
};
type Injected = DependenciesOf<EntryGraph, 'useViewModel'>;

const Entry_ = ({ useViewModel }: Props & Injected) => {
  const { text, onClick } = useViewModel();

  return (
    <li>
      <button onClick={onClick}>{text}</button>
    </li>
  );
};

export const Entry = injectComponent<Props, Injected>(Entry_, EntryGraph);
`

describe('GoToDefinitionStrategyFactory', () => {
  let uut: StrategyFactory;

  beforeEach(() => {
    uut = new StrategyFactory(mock(), mock());
  });

  it('should return a hook strategy when the node is an injected hook parameter', () => {
    const sourceFile = ts.createSourceFile('test.ts', HOOK_PARAMETER, ts.ScriptTarget.Latest, true);
    const node = findNodeByText(sourceFile, 'useViewModel')!;
    console.log(node.getText());
    const strategy = uut.create(node);
    expect(strategy).toBeInstanceOf(HookStrategy);
  });
});