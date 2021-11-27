import PropertyRetrieverDelegate from './PropertyRetrieverDelegate';

interface Graph extends PropertyRetrieverDelegate {
  get name(): string;
}

export default Graph;
