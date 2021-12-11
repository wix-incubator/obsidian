import ObjectGraph from '../graph/ObjectGraph';

type Constructable<T> = {
  new(...args: any): T;
};

type GraphClass<T extends ObjectGraph<P>, P> = {
  new(props?: P): T;
};

type Scope = string | number | symbol;

type Constructor = { new(...args: any[]): any };

type GraphType = { new(...args: any[]): ObjectGraph };

type ServiceLocator<Clazz> = {
  [Key in keyof Clazz]: Function
};

type GraphInternals = 'retrieve' | 'name' | 'scope';
