import ts = require("typescript");
import { getDecorator, getDecoratedMethods } from "../utils/decorators";
import { Provider } from "./provider";
import { logger } from "../server";
import * as path from 'path';
import { TextDocument } from "vscode-languageserver-textdocument";

interface SubgraphInfo {
  classDeclaration: ts.ClassDeclaration;
  sourceFile: ts.SourceFile;
  document: TextDocument;
}

function resolveModulePath(currentFilePath: string, moduleSpecifier: string): string {
  const filePath = currentFilePath.replace(/^file:\/\//, '');
  const currentDir = filePath.replace(/\/[^/]+$/, '');
  const resolvedPath = path.resolve(currentDir, moduleSpecifier);
  return resolvedPath.endsWith('.ts') ? resolvedPath : resolvedPath + '.ts';
}

export class Graph {
  constructor(private node: ts.ClassDeclaration) { }

  public hasProvider(name: string): boolean {
    return this.findProvider(name) !== undefined;
  }

  public requireProvider(name: string) {
    return this.findProvider(name)!;
  }

  public findProvider(name: string) {
    const providers = this.getProviders().find(
      provider => provider.name.getText() === name.replace(/^_/, '')
    );
    return providers && new Provider(providers);
  }

  public getProviders() {
    return getDecoratedMethods(this.node, ['Provides', 'provides']);
  }

  public getSubgraphs(): SubgraphInfo[] {
    const graphDecorator = getDecorator(this.node, ['Graph', 'graph']);
    if (!graphDecorator) return [];

    const subgraphsArg = graphDecorator.getArgument(0, 'subgraphs');
    logger.info(`subgraphsArg: ${subgraphsArg?.getText()}`);
    if (!subgraphsArg || !ts.isArrayLiteralExpression(subgraphsArg)) return [];

    return subgraphsArg.elements
      .filter((element): element is ts.Identifier => ts.isIdentifier(element))
      .map(identifier => {
        // Find the import statement for this identifier
        const sourceFile = this.node.getSourceFile();
        let importDeclaration: ts.ImportDeclaration | undefined;

        // Search through imports to find where this identifier is imported from
        for (const statement of sourceFile.statements) {
          if (ts.isImportDeclaration(statement)) {
            const importClause = statement.importClause;
            if (importClause) {
              // Check named imports
              if (importClause.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
                const namedImport = importClause.namedBindings.elements.find(
                  element => element.name.text === identifier.text
                );
                if (namedImport) {
                  importDeclaration = statement;
                  break;
                }
              }
              // Check namespace imports
              if (importClause.namedBindings && ts.isNamespaceImport(importClause.namedBindings)) {
                const namespaceName = importClause.namedBindings.name.text;
                if (namespaceName === identifier.text) {
                  importDeclaration = statement;
                  break;
                }
              }
            }
          }
        }

        if (!importDeclaration) {
          logger.info(`No import found for subgraph: ${identifier.text}`);
          return undefined;
        }

        // Get the module specifier (the path being imported from)
        const moduleSpecifier = importDeclaration.moduleSpecifier;
        if (!ts.isStringLiteral(moduleSpecifier)) {
          logger.info(`Invalid module specifier for subgraph: ${identifier.text}`);
          return undefined;
        }

        // Resolve the module path
        const resolvedPath = resolveModulePath(sourceFile.fileName, moduleSpecifier.text);
        logger.info(`Resolved path: ${resolvedPath}`);

        // Read the file content
        const fileContent = ts.sys.readFile(resolvedPath);
        if (!fileContent) {
          logger.info(`Could not read file: ${resolvedPath}`);
          return undefined;
        }

        // Create a source file from the content
        const importedSourceFile = ts.createSourceFile(
          resolvedPath,
          fileContent,
          ts.ScriptTarget.Latest,
          true
        );
        logger.info(`importedSourceFile: ${importedSourceFile.statements.length}`);

        // Find the class declaration
        let classDeclaration: ts.ClassDeclaration | undefined;

        // First try to find a named export
        for (const statement of importedSourceFile.statements) {
          if (ts.isClassDeclaration(statement) && statement.name?.text === identifier.text) {
            classDeclaration = statement;
            break;
          }
        }

        if (!classDeclaration) {
          logger.info(`Could not find class declaration for: ${identifier.text}`);
          return undefined;
        }

        // Create a TextDocument from the file content
        const document = TextDocument.create(
          `file://${resolvedPath}`,
          'typescript',
          1,
          fileContent
        );

        return {
          classDeclaration,
          sourceFile: importedSourceFile,
          document
        };
      })
      .filter((info): info is SubgraphInfo => info !== undefined);
  }
}






