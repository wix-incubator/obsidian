declare type Constructable<T> = {
  new(...args: any): T;
};

declare type Scope = string | number | symbol;

declare type Constructor = { new(...args: any[]): any };

declare type ServiceLocator<Clazz> = {
  [Key in keyof Clazz]: Function
};

declare type GraphInternals = 'retrieve' | 'name' | 'scope';
