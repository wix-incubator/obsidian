import * as fs from 'fs';
import { parse } from '@typescript-eslint/parser';
import type { PathResolver } from './pathResolver';
import { File } from '../dto/file';

export class FileReader {
  constructor(private pathResolver: PathResolver) { }

  public read(baseFilePath: string, relativeFilePath: string) {
    const filePath = this.pathResolver.resolve(baseFilePath, relativeFilePath);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    const fileAST = this.parse(fileContent, filePath);
    return new File(fileAST, filePath);
  }

  private parse(content: string, filePath: string) {
    return parse(
      content,
      {
        ecmaVersion: 9,
        ecmaFeatures: {
          globalReturn: false,
          jsx: true,
        },
        sourceType: 'module',
        comment: true,
        attachComment: true,
        tokens: true,
        loc: true,
        range: true,
        filePath,
      },
    );
  }
}
