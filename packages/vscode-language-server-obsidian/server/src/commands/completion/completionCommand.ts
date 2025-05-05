import { CompletionItem, CompletionParams, CompletionItemKind, InsertTextFormat } from 'vscode-languageserver/node';
import { Logger } from '../../services/logger';
import { ProjectAdapter } from '../../services/project/projectAdapter';
import { Node, SyntaxKind } from 'ts-morph';
import { getParentGraphRecursive } from '../../utils/obsidian/graphs';
import { hasDecorator } from '../../utils/ts/decorators';
import { SourceFile } from '../../dto/sourceFile';
import { getAncestorProvider } from '../../utils/obsidian/providers';
import { Provider } from '../../dto/provider';

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

  private getCompletionItems(node: Node | undefined): CompletionItem[] {
    if (!this.isInProvidesFunction(node)) return [];
    const provider = getAncestorProvider(node);
    return getParentGraphRecursive(this.projectAdapter, node)
      ?.resolveProviders()
      .filter(p => p.name !== provider?.name)
      .map(this.providerToCompletion) ?? [];
  }

  private providerToCompletion(provider: Provider): CompletionItem {
    return {
      label: provider.name,
      kind: CompletionItemKind.Class,
      insertText: `${provider.name}: ${provider.type}`,
      insertTextFormat: InsertTextFormat.Snippet,
      detail: provider.type,
    };
  }

  private isInProvidesFunction(node: Node | undefined): boolean {
    const parent = node?.getParentIfKind(SyntaxKind.MethodDeclaration);
    return hasDecorator(parent, ['provides', 'Provides']);
  }

  private logCommand(node: Node | undefined, sourceFile: SourceFile, params: CompletionParams) {
    this.logger.info(`🔍 Computing completions at position: ${JSON.stringify(params.position)}`);
    this.logger.debug(`Source file: ${sourceFile.filePath}`);
    this.logger.debug(`Current node: ${node?.getText()}`);
  }
} 