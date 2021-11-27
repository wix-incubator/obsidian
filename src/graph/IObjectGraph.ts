interface IObjectGraph {
  get name(): string;
  get: (property: string, receiver?: unknown) => unknown | undefined;
}

export default IObjectGraph;
