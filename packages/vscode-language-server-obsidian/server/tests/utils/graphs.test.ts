import { getParentGraphRecursive } from '../../src/utils/graphs';
import * as ts from 'typescript';

describe('graphs', () => {
  describe('getParentGraphRecursive', () => {
    it('should return null for a node without a parent class', () => {
      const sourceText = `
        const x = 1;
      `;
      const sourceFile = ts.createSourceFile(
        'test.ts',
        sourceText,
        ts.ScriptTarget.Latest,
        true
      );

      const node = sourceFile.statements[0];
      expect(getParentGraphRecursive(node)).not.toBeDefined();
    });

    it('should return the graph for a node within a class', () => {
      const sourceText =
        `@graph()
class TestClass {
  constructor(param: string) {}
}`;
      const sourceFile = ts.createSourceFile(
        'test.ts',
        sourceText,
        ts.ScriptTarget.Latest,
        true
      );

      const parameter = sourceFile.statements[0].getChildAt(4);

      const graph = getParentGraphRecursive(parameter);
      expect(graph?.toString()).toBe(sourceText);
    });
  });
}); 