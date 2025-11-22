import PropertyRetrieverDelegate from './properties/PropertyRetrieverDelegate';

export interface Graph extends PropertyRetrieverDelegate {
  get name(): string;
  onBind(target: any): void;
}
