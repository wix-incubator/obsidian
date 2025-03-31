import { getDecoratedMethods, hasProvidesDecorator } from '../../src/utils/decorators';
import * as ts from 'typescript';

const DECORATED_METHOD = `
@graph()
class TestClass {
  @provides()
  getValue(): string {
    return "test";
  }
}
`

const UNDECORATED_METHOD = `
@graph()
class TestClass {
  getValue(): string {
    return "test";
  }
}
`

describe('decorators', () => {
  describe('hasProvidesDecorator', () => {
    it.each([
      {
        description: 'method with @provides decorator',
        sourceText: DECORATED_METHOD,
        expected: true
      },
      {
        description: 'method without @provides decorator',
        sourceText: UNDECORATED_METHOD,
        expected: false
      }
    ])('should return $expected for a $description', ({ sourceText, expected }) => {
      const sourceFile = ts.createSourceFile(
        'test.ts',
        sourceText,
        ts.ScriptTarget.Latest,
        true
      );

      const method = sourceFile.statements[0].getChildAt(4).getChildAt(0);
      expect(hasProvidesDecorator(method)).toBe(expected);
    });
  });

  describe('getDecoratedMethods', () => {
    it('should return the decorated methods', () => {
      const sourceFile = ts.createSourceFile(
        'test.ts',
        DECORATED_METHOD,
        ts.ScriptTarget.Latest,
        true
      );

      const methods = getDecoratedMethods(sourceFile.statements[0] as ts.ClassDeclaration, ['provides']);
      expect(methods.length).toBe(1);
    });
  });
}); 