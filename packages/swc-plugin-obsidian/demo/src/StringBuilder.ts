export class StringBuilder {
  private buffer: string[] = [];

  append(value: string) {
    this.buffer.push(value);
    return this;
  }

  toString() {
    return this.buffer.join('');
  }
}