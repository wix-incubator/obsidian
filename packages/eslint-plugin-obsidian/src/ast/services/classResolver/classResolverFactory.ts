import { RuleContext } from '@typescript-eslint/utils/ts-eslint';
import { FileReader } from '../../../framework/fileReader';
import { ClassResolver } from './classResolver';
import { TsConfigAwareClassResolver } from './tsConfigAwareClassResolver';
import { SimpleClassResolver } from './simpleClassResolver';

export class ClassResolverFactory {
  constructor(private context: RuleContext<any, any>, private fileReader: FileReader) { }

  public create(): ClassResolver {
    switch (this.getResolverType()) {
      case 'tsConfigAware':
        return new TsConfigAwareClassResolver(this.context, this.fileReader);
      case 'simple':
        return new SimpleClassResolver(this.fileReader);
    }
  }

  private getResolverType() {
    const parserServices = this.context.sourceCode.parserServices;
    return parserServices?.program && parserServices?.esTreeNodeToTSNodeMap ? 'tsConfigAware' : 'simple';
  }
}
