import type { TSESTree } from '@typescript-eslint/types';
import { mapArrayExpression, requireProgram } from '../../utils/ast';
import { ClassFile } from '../../dto/classFile';
import type { Property } from '../../dto/property';
import { File } from '../../dto/file';
import type { FileReader } from '../../framework/fileReader';

export class SubgraphResolver {
  constructor(private fileReader: FileReader) { }

  public resolve(clazz: ClassFile): ClassFile[] {
    return [
      ...this.getImportedGraphs(clazz),
      ...this.getLocalGraphs(clazz),
    ].flatMap(g => [g, ...this.resolve(g)]);
  }

  private getImportedGraphs(clazz: ClassFile) {
    const subgraphs = this.getSubgraphsPropertyFromGraphDecorator(clazz);
    return this.getImportedSubgraphClasses(clazz, subgraphs);
  }

  private getImportedSubgraphClasses(clazz: ClassFile, subgraphs: Property | undefined) {
    if (!subgraphs) return [];
    const subgraphNames = this.getSubgraphNamesFromDecoratorProperty(subgraphs);
    const classes: ClassFile[] = [];
    clazz.imports.forEach(($import) => {
      subgraphNames.forEach((subgraphName: string) => {
        if ($import.includes(subgraphName)) {
          classes.push(...this.fileReader.read(clazz.path, $import.path).toClassWithImports());
        }
      });
    });
    return classes;
  }

  private getLocalGraphs(clazz: ClassFile) {
    const subgraphs = this.getSubgraphsPropertyFromGraphDecorator(clazz);
    return this.getLocalSubgraphClasses(subgraphs, clazz);
  }

  private getSubgraphsPropertyFromGraphDecorator({ clazz }: ClassFile) {
    const graphDecorator = clazz.requireDecorator('Graph');
    return graphDecorator.getProperty('subgraphs');
  }

  private getLocalSubgraphClasses(subgraphs: Property | undefined, clazz: ClassFile) {
    if (!subgraphs) return [];
    const allSubgraphs = this.getSubgraphNamesFromDecoratorProperty(subgraphs);
    const localGraphNames = this.getLocalGraphNames(allSubgraphs, clazz);
    return this.createLocalGraphClasses(clazz, localGraphNames);
  }

  private createLocalGraphClasses({ clazz, imports, path }: ClassFile, localGraphNames: string[]) {
    if (localGraphNames.length === 0) return [];
    const parent = new File(requireProgram(clazz.node), path);
    return localGraphNames.map((localGraphName) => {
      return new ClassFile(parent.requireGraph(localGraphName), imports, path);
    });
  }

  private getSubgraphNamesFromDecoratorProperty(subgraphs: Property) {
    return mapArrayExpression(
      subgraphs.getValue<TSESTree.ArrayExpression>(),
      el => (el as TSESTree.Identifier).name,
    );
  }

  private getLocalGraphNames(subgraphs: string[], { imports }: ClassFile) {
    return subgraphs.filter((subgraph) => {
      return imports.some(($import) => {
        return $import.includes(subgraph);
      }) === false;
    });
  }
}
