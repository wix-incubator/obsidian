interface PropertyRetrieverDelegate {
  retrieve: (property: string, receiver?: unknown) => unknown | undefined;
}

export default PropertyRetrieverDelegate;
