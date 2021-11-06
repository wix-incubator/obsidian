import ObjectGraph from '../obsidian/ObjectGraph';

type Constructable<T> = {
  new(...args: any): T;
}

type Scope = string | number | symbol

type Constructor = {new(...args: any[]): any}

type GraphType = {new(...args: any[]): ObjectGraph};
