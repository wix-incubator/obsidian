import { CompletionItem, CompletionParams, CompletionItemKind } from 'vscode-languageserver/node';
import { Logger } from '../../services/logger';
import { ProjectAdapter } from '../../services/project/projectAdapter';
import { Node, SyntaxKind } from 'ts-morph';
import { getParentGraphRecursive } from '../../utils/obsidian/graphs';
import { hasDecorator } from '../../utils/ts/decorators';
import { SourceFile } from '../../dto/sourceFile';

export class CompletionCommand {
  constructor (private projectAdapter: ProjectAdapter, private logger: Logger) {
    this.logger.debug(`CompletionCommand constructor`);
  }

  public async getCompletions(params: CompletionParams): Promise<CompletionItem[]> {
    const sourceFile = this.projectAdapter.getSourceFileOrThrow(params.textDocument.uri);
    const node = sourceFile.getNodeAtPosition(params.position);
    this.logCommand(node, sourceFile, params);
    return this.getCompletionItems(node);
  }

  private isInProvidesFunction(node: Node | undefined): boolean {
    const parent = node?.getParentIfKind(SyntaxKind.MethodDeclaration);
    return hasDecorator(parent, ['provides', 'Provides']);
  }

  private getCompletionItems(node: Node | undefined): CompletionItem[] {
    if (!this.isInProvidesFunction(node)) return [];
    const graph = getParentGraphRecursive(this.projectAdapter, node);
    const providers = graph?.resolveProviders();

    const res = providers?.map(provider => ({
      label: provider.name,
      kind: CompletionItemKind.Class,
      labelDetails: {
        detail: provider.type
      }
    }));

    return res || [];
  }

  private logCommand(node: Node | undefined, sourceFile: SourceFile, params: CompletionParams) {
    this.logger.info(`🔍 Computing completions at position: ${JSON.stringify(params.position)}`);
    this.logger.debug(`Source file: ${sourceFile.filePath}`);
    this.logger.debug(`Current node: ${node?.getText()}`);
  }
} 