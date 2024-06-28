import type { TSESTree } from '@typescript-eslint/types';
import { Clazz } from './class';
import { getClassDeclaration, isClassLike, isImportDeclaration } from '../ast/utils';
import { Import } from './import';
import { ClassWithImports } from './classWithImports';
import { assertDefined } from '../utils/assertions';

export class File {
  constructor(
    private program: TSESTree.Program,
    private path: string,
  ) { }

  public requireGraph(name: string) {
    const graph = this.classNodes.find((node) => {
      return node?.id?.name === name;
    });
    assertDefined(graph, `Graph ${name} not found in file`);
    return new Clazz(graph);
  }

  private get classNodes() {
    return this.body
      .filter(isClassLike)
      .map(getClassDeclaration);
  }

  private get body() {
    return this.program.body;
  }

  public toClassWithImports() {
    return this.graphs.map((graph) => {
      return new ClassWithImports(graph, this.imports, this.path);
    });
  }

  get imports() {
    return this.body
      .filter(isImportDeclaration)
      .map((node) => new Import(node));
  }

  get graphs() {
    return this.body
      .filter(isClassLike)
      .map((node) => {
        const clazz = getClassDeclaration(node);
        return clazz && new Clazz(clazz);
      })
      .filter((clazz: Clazz | undefined) => {
        return clazz ? clazz.decoratorNames.includes('Graph') : false;
      }) as Clazz[];
  }
}
