import PropertyRetrieverDelegate from './PropertyRetrieverDelegate';

export interface Graph extends PropertyRetrieverDelegate {
  get name(): string;
  onBind(target: any): void;
}
