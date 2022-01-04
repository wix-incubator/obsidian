export type Constructable<T> = {
  new(...args: any): T;
};

export type Constructor = { new(...args: any[]): any };

export type ServiceLocator<Clazz> = {
  [Key in keyof Clazz]: Function
};

export type GraphInternals = 'retrieve' | 'name' | 'scope';
