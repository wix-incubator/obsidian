import { HookStrategy } from "../../../../src/commands/definition/strategies/hookStrategy";
import { Project } from "ts-morph";
import { ProjectAdapter } from "../../../../src/services/ast/project";
import { mock } from "jest-mock-extended";

const COMPONENT_SOURCE = `import { type DependenciesOf, injectComponent } from 'react-obsidian';
import { EntryGraph } from './di/EntryGraph';

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

describe('HookStrategy', () => {
  let uut: HookStrategy;
  let projectAdapter: jest.Mocked<ProjectAdapter>;

  beforeEach(() => {
    projectAdapter = mock();
    uut = new HookStrategy(projectAdapter);
  });

  xit('should be implemented', async () => {
    // Create a new ts-morph project
    const project = new Project({
      useInMemoryFileSystem: true,
    });

    // Create a source file
    const sourceFile = project.createSourceFile("test.ts", COMPONENT_SOURCE);

    // Find the useViewModel node
    const useViewModelNode = sourceFile.getDescendants().find(node =>
      node.getText() === 'useViewModel' &&
      node.getParent()?.getKindName() === 'ObjectBindingPattern'
    );

    expect(await uut.goToDefinition(useViewModelNode!)).toBe(undefined);
  });
});
