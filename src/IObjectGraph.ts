interface IObjectGraph {
  get: (property: string, receiver?: unknown) => unknown | undefined;
}

export default IObjectGraph;
