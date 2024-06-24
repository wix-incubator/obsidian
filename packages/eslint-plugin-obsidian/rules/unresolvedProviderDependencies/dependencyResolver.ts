import { TSESTree } from '@typescript-eslint/types';
import type { FileReader } from '../framework/fileReader';
import { ClassWithImports } from '../dto/classWithImports';
import type { Property } from '../dto/property';
import type { Import } from '../dto/import';
import { mapArrayExpression, requireProgram } from '../ast/utils';
import { File } from '../dto/file';
import type { Clazz } from '../dto/class';

export class DependencyResolver {
  constructor(private fileReader: FileReader) { }

  public resolve(clazz: Clazz, imports: Import[]) {
    const classWithImports = new ClassWithImports(clazz, imports);
    return [
      ...this.getGraphDependencies(classWithImports),
      ...this.getDependenciesFromSubgraphs(classWithImports),
    ];
  }

  private getDependenciesFromSubgraphs(clazz: ClassWithImports): string[] {
    return this.getSubgraphs(clazz)
      .map(this.getGraphDependencies)
      .flat();
  }

  private getGraphDependencies({ clazz }: ClassWithImports) {
    return clazz.getDecoratedMethods('Provides');
  }

  private getSubgraphs(clazz: ClassWithImports) {
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

  private getSubgraphNames(subgraphs: Property) {
    return mapArrayExpression(
      subgraphs.getValue<TSESTree.ArrayExpression>(),
      (el) => (el as TSESTree.Identifier).name,
    );
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

  private getLocalGraphNames(subgraphs: string[], imports: Import[]) {
    return subgraphs.filter((subgraph) => {
      return imports.some(($import) => {
        return $import.includes(subgraph);
      }) === false;
    });
  }
}