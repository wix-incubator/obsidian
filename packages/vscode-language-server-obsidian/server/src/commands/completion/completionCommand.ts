import { CompletionItem, CompletionParams, CompletionItemKind } from 'vscode-languageserver/node';
import { Logger } from '../../services/logger';
import { ProjectAdapter } from '../../services/project/projectAdapter';
import { Node, SourceFile } from 'ts-morph';
import { getParentGraphRecursive } from '../../utils/obsidian/graphs';

export class CompletionCommand {
  constructor (private projectAdapter: ProjectAdapter, private logger: Logger) {
    this.logger.debug(`CompletionCommand constructor`);
  }

  public async getCompletions(params: CompletionParams): Promise<CompletionItem[]> {
    const sourceFile = this.projectAdapter.getSourceFile(params.textDocument.uri);
    if (!sourceFile) {
      throw new Error(`Source file not found for URI: ${params.textDocument.uri}`);
    }

    const node = this.getCompletionNode(sourceFile, params);
    this.logCommand(node, sourceFile, params);

    // Only provide completions if we're in a provides-decorated function
    if (!this.isInProvidesFunction(node)) {
      return [];
    }

    return this.getCompletionItems(node, sourceFile);
  }

  private getCompletionNode(sourceFile: SourceFile, params: CompletionParams): Node | undefined {
    const position = sourceFile.compilerNode.getPositionOfLineAndCharacter(
      params.position.line,
      params.position.character
    );
    return sourceFile.getDescendantAtPos(position);
  }

  private isInProvidesFunction(node: Node | undefined): boolean {
    if (!node) return false;

    // Walk up the AST to find the nearest method declaration
    let current: Node | undefined = node;
    while (current && !Node.isMethodDeclaration(current)) {
      current = current.getParent();
    }

    // If we found a method declaration, check if it has @provides or @Provides decorator
    if (current) {
      const decorators = current.getDecorators();
      return decorators.some(decorator => {
        const name = decorator.getName();
        return name === 'provides' || name === 'Provides';
      });
    }

    return false;
  }

  private getCompletionItems(node: Node | undefined, sourceFile: SourceFile): CompletionItem[] {
    if (!node) return [];
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
    this.logger.debug(`Source file: ${sourceFile.getFilePath()}`);
    this.logger.debug(`Current node: ${node?.getText()}`);
  }
} 