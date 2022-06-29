export type Constructable<T> = {
  new(...args: any): T;
};

export type Constructor = { new(...args: any[]): any };

export type ServiceLocator<Clazz> = {
  [Key in keyof Clazz]: Function
};

export type GraphInternals = 'retrieve' | 'name' | 'scope';

export type ProvidedDependencies<Graph> = {
  [Key in keyof Omit<Graph, GraphInternals>]: Graph[Key] extends (...args: any[]) => infer R ? R : never;
};
