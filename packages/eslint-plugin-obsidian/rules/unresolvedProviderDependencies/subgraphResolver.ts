import type { TSESTree } from '@typescript-eslint/types';
import { mapArrayExpression, requireProgram } from '../ast/utils';
import type { Clazz } from '../dto/class';
import { ClassWithImports } from '../dto/classWithImports';
import type { Import } from '../dto/import';
import type { Property } from '../dto/property';
import { File } from '../dto/file';
import type { FileReader } from '../framework/fileReader';

export class SubgraphResolver {
  constructor(private fileReader: FileReader) { }

  public resolve(clazz: ClassWithImports) {
    const importedGraphs = this.getImportedGraphs(clazz);
    const localGraphs = this.getLocalGraphs(clazz);
    return [...importedGraphs, ...localGraphs];
  }

  private getImportedGraphs({ clazz, imports }: ClassWithImports) {
    const subgraphs = this.getSubgraphsPropertyFromGraphDecorator(clazz);
    return this.getImportedSubgraphClasses(subgraphs, imports);
  }

  private getImportedSubgraphClasses(subgraphs: Property | undefined, imports: Import[]) {
    if (!subgraphs) return [];
    const subgraphNames = this.getSubgraphNames(subgraphs);
    const classes: ClassWithImports[] = [];
    imports.forEach(($import) => {
      // TODO: convert this to a map with an inner for each?
      subgraphNames.forEach((subgraphName: string) => {
        if ($import.includes(subgraphName)) {
          classes.push(...this.fileReader.read($import.path).toClassWithImports());
        }
      });
    });
    return classes;
  }

  private getLocalGraphs(clazzWithImports: ClassWithImports) {
    const subgraphs = this.getSubgraphsPropertyFromGraphDecorator(clazzWithImports.clazz);
    return this.getLocalSubgraphClasses(subgraphs, clazzWithImports);
  }

  private getSubgraphsPropertyFromGraphDecorator(clazz: Clazz) {
    const graphDecorator = clazz.requireDecorator('Graph');
    return graphDecorator.getProperty('subgraphs');
  }

  private getLocalSubgraphClasses(subgraphs: Property | undefined, { clazz, imports }: ClassWithImports) {
    if (!subgraphs) return [];
    const subgraphNames = this.getSubgraphNames(subgraphs);
    const localGraphNames = this.getLocalGraphNames(subgraphNames, imports);

    const parent = new File(requireProgram(clazz.node));
    return localGraphNames.map((localGraphName) => {
      return new ClassWithImports(parent.requireGraph(localGraphName), imports);
    });
  }

  private getSubgraphNames(subgraphs: Property) {
    return mapArrayExpression(
      subgraphs.getValue<TSESTree.ArrayExpression>(),
      (el) => (el as TSESTree.Identifier).name,
    );
  }

  private getLocalGraphNames(subgraphs: string[], imports: Import[]) {
    return subgraphs.filter((subgraph) => {
      return imports.some(($import) => {
        return $import.includes(subgraph);
      }) === false;
    });
  }
}