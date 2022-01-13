export class ConstructorArgs {
  private readonly args = new Array<[string, number]>();

  add(paramName: string, index: number) {
    this.args.push([paramName, index]);
  }

  getProperty(index: number): any {
    return this.args[index][0];
  }
}
