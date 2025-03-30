import ts = require("typescript");

export class Decorator {
  constructor(private decorator: ts.Decorator) { }

  public get name() {
    return this.decorator.expression.getText();
  }

  public getArgument(index: number, name?: string): ts.Node | undefined {
    const decoratorExpr = this.decorator.expression;
    if (!ts.isCallExpression(decoratorExpr)) return undefined;

    const args = decoratorExpr.arguments;
    if (index >= args.length) return undefined;

    const arg = args[index];
    if (!name) return arg;

    // If name is provided, expect an object literal
    if (!ts.isObjectLiteralExpression(arg)) return undefined;

    // Find the property with the given name
    const property = arg.properties.find(prop =>
      ts.isPropertyAssignment(prop) &&
      ts.isIdentifier(prop.name) &&
      prop.name.text === name
    );

    if (!property || !ts.isPropertyAssignment(property)) return undefined;
    return property.initializer;
  }
}
