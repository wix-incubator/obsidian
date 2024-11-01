import type { TSESTree } from '@typescript-eslint/types';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

export class Context<MessageId extends string = any, Options extends readonly unknown[] = any> {
  constructor(private context: RuleContext<MessageId, Options>) { }

  /**
   * Returns the fully qualified path to the current file being linted.
   */
  public get currentFilePath() {
    return this.context.getPhysicalFilename?.();
  }

  public reportError(node: TSESTree.Node, messageId: MessageId, data: Record<string, unknown>) {
    this.context.report({ messageId, node, data });
  }
}
