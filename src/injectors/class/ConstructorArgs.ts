export class ConstructorArgs {
  private readonly args = new Array<[string, number]>();

  hasArgs(): boolean {
    return this.args.length > 0;
  }

  size(): number {
    return this.args.length;
  }

  add(paramName: string, index: number) {
    this.args.push([paramName, index]);
  }

  getProperty(index: number): any {
    if (this.args.length <= index) throw new Error('IOOB while trying to get constructor args to inject');
    return this.args[index][0];
  }
}
