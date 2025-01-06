import type { TSESTree } from '@typescript-eslint/types';
import { Clazz } from './class';
import {
  getClassDeclaration,
  isClassLike,
  isImportDeclaration,
  isVariableDeclaration,
} from '../utils/ast';
import { Import } from './import';
import { ClassFile } from './classFile';
import { assertDefined } from '../utils/assertions';
import { Variable } from './variable';

export class File {
  constructor(program: TSESTree.Program, path?: string);
  constructor(private program: TSESTree.Program, private path: string) { }

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
      return new ClassFile(graph, this.imports, this.path);
    });
  }

  get imports() {
    return this.body
      .filter(isImportDeclaration)
      .map(node => new Import(node));
  }

  get graphs() {
    return this.body
      .filter(isClassLike)
      .map((node) => {
        const clazz = getClassDeclaration(node);
        return clazz && new Clazz(clazz);
      })
      .filter((clazz: Clazz | undefined) => {
        return clazz ? clazz.isDecoratedWithIgnoreCase('Graph') : false;
      }) as Clazz[];
  }

  findClass(byName: string) {
    const clazz = this.classes.find($clazz => $clazz.name === byName);
    return clazz && new ClassFile(clazz, this.imports, this.path);
  }

  private get classes() {
    return this.body
      .filter(isClassLike)
      .map((node) => {
        const clazz = getClassDeclaration(node);
        return clazz && new Clazz(clazz);
      })
      .filter(Boolean) as Clazz[];
  }

  get variables() {
    return this.body
      .filter(isVariableDeclaration)
      .map(node => node.declarations)
      .flat()
      .map(node => new Variable(node));
  }
}
