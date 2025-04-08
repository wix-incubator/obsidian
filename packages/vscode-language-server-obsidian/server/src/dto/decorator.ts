import { Decorator as TsMorphDecorator, Node, CallExpression, ObjectLiteralExpression, PropertyAssignment, Identifier, SyntaxKind } from 'ts-morph';

export class Decorator {
  constructor(private decorator: TsMorphDecorator) { }

  public get name() {
    return this.decorator.getExpression().getText();
  }

  public getArgument(index: number, name?: string): Node | undefined {
    const decoratorExpr = this.decorator.getExpression();
    if (!decoratorExpr.isKind(SyntaxKind.CallExpression)) return undefined;

    const args = (decoratorExpr as CallExpression).getArguments();
    if (index >= args.length) return undefined;

    const arg = args[index];
    if (!name) return arg;

    // If name is provided, expect an object literal
    if (!arg.isKind(SyntaxKind.ObjectLiteralExpression)) return undefined;

    // Find the property with the given name
    const property = (arg as ObjectLiteralExpression)
      .getProperties()
      .find(prop =>
        prop.isKind(SyntaxKind.PropertyAssignment) &&
        (prop as PropertyAssignment).getName() === name
      );

    if (!property?.isKind(SyntaxKind.PropertyAssignment)) return undefined;
    return (property as PropertyAssignment).getInitializer();
  }
}
