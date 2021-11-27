interface Graph {
  get name(): string;
  get: (property: string, receiver?: unknown) => unknown | undefined;
}

export default Graph;
