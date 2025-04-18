import {
  SyntaxKind,
  Node,
  Identifier,
  BindingElement,
  ObjectBindingPattern,
  ParameterDeclaration,
  TypeReferenceNode,
  IntersectionTypeNode,
  UnionTypeNode,
  ParenthesizedTypeNode,
  TypeAliasDeclaration,
  ClassDeclaration,
  ArrayLiteralExpression,
  ImportDeclaration,
  NamedImports,
  StringLiteral
} from "ts-morph";

export function findExportNode(identifier: Identifier): Node | undefined {
  const symbol = identifier.getSymbol();
  if (!symbol) return;

  for (const decl of symbol.getDeclarations()) {
    const parent = decl.getParent();

    if (Node.isVariableDeclaration(decl)) {
      const varStatement = decl.getFirstAncestorByKind(SyntaxKind.VariableStatement);
      if (varStatement?.isExported()) return varStatement;
    }

    if (Node.isFunctionDeclaration(decl) && decl.isExported()) {
      return decl;
    }

    if (Node.isExportSpecifier(decl)) {
      const exportDecl = decl.getFirstAncestorByKind(SyntaxKind.ExportDeclaration);
      if (exportDecl) return exportDecl;
    }

    if (Node.isExportAssignment(decl)) {
      return decl;
    }
  }

  return;
}

export function isBindingElement(node: Node | undefined): node is BindingElement {
  return node?.getKind() === SyntaxKind.BindingElement;
}

export function isObjectBindingPattern(node: Node | undefined): node is ObjectBindingPattern {
  return node?.getKind() === SyntaxKind.ObjectBindingPattern;
}

export function isParameter(node: Node | undefined): node is ParameterDeclaration {
  return node?.getKind() === SyntaxKind.Parameter;
}

export function isTypeReferenceNode(node: Node | undefined): node is TypeReferenceNode {
  return node?.getKind() === SyntaxKind.TypeReference;
}

export function isIntersectionTypeNode(node: Node | undefined): node is IntersectionTypeNode {
  return node?.getKind() === SyntaxKind.IntersectionType;
}

export function isUnionTypeNode(node: Node | undefined): node is UnionTypeNode {
  return node?.getKind() === SyntaxKind.UnionType;
}

export function isParenthesizedTypeNode(node: Node | undefined): node is ParenthesizedTypeNode {
  return node?.getKind() === SyntaxKind.ParenthesizedType;
}

export function isTypeAliasDeclaration(node: Node | undefined): node is TypeAliasDeclaration {
  return node?.getKind() === SyntaxKind.TypeAliasDeclaration;
}

export function isClassDeclaration(node: Node | undefined): node is ClassDeclaration {
  return node?.getKind() === SyntaxKind.ClassDeclaration;
}

export function isArrayLiteralExpression(node: Node | undefined): node is ArrayLiteralExpression {
  return node?.getKind() === SyntaxKind.ArrayLiteralExpression;
}

export function isIdentifier(node: Node | undefined): node is Identifier {
  return node?.getKind() === SyntaxKind.Identifier;
}

export function isImportDeclaration(node: Node | undefined): node is ImportDeclaration {
  return node?.getKind() === SyntaxKind.ImportDeclaration;
}

export function isNamedImports(node: Node | undefined): node is NamedImports {
  return node?.getKind() === SyntaxKind.NamedImports;
}

export function isStringLiteral(node: Node | undefined): node is StringLiteral {
  return node?.getKind() === SyntaxKind.StringLiteral;
}

export function getTypeAliases(node: TypeReferenceNode): TypeAliasDeclaration[] {
  const typeNameNode = node.getTypeName();
  if (isIdentifier(typeNameNode)) {
    return typeNameNode
      .getSymbol()
      ?.getDeclarations()
      .filter(isTypeAliasDeclaration) ?? [];
  }
  return [];
}