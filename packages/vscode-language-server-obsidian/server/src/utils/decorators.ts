import * as ts from 'typescript';

export function hasDecorator(node: ts.Node, decoratorNames: string[]): boolean {
    const decorators = ts.canHaveDecorators(node) ? ts.getDecorators(node) : undefined;
    if (!decorators) return false;

    for (const decorator of decorators) {
        const decoratorExpr = decorator.expression;
        if (ts.isCallExpression(decoratorExpr)) {
            const identifier = decoratorExpr.expression;
            if (ts.isIdentifier(identifier)) {
                const decoratorName = identifier.text;
                if (decoratorNames.includes(decoratorName)) return true;
            }
        }
    }

    return false;
}

export function hasProvidesDecorator(node: ts.Node): boolean {
    if (!ts.isMethodDeclaration(node)) return false;
    return hasDecorator(node, ['Provides', 'provides']);
}

export function hasGraphDecorator(node: ts.Node): boolean {
    if (!ts.isClassDeclaration(node)) return false;
    return hasDecorator(node, ['Graph', 'graph']);
}

export function getDecoratedMethods(node: ts.ClassDeclaration, decoratorNames: string[]): ts.MethodDeclaration[] {
    const methods: ts.MethodDeclaration[] = [];

    function visit(node: ts.Node) {
        if (ts.isMethodDeclaration(node) && hasDecorator(node, decoratorNames)) {
            methods.push(node);
        }
        ts.forEachChild(node, visit);
    }

    visit(node);
    return methods;
}