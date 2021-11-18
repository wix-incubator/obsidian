import ObjectGraph from '../ObjectGraph';

type Constructable<T> = {
  new(...args: any): T;
}

type Scope = string | number | symbol

type Constructor = {new(...args: any[]): any}

type GraphType = {new(...args: any[]): ObjectGraph};

type ServiceLocator<Clazz> = {
  [Key in keyof Clazz]: Function
}
