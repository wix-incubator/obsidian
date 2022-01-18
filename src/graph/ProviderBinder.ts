/* eslint-disable no-param-reassign */
import providedPropertiesStore from '../ProvidedPropertiesStore';
import { Graph } from './Graph';

export function bindProviders(graph: Graph & Record<string, any>) {
  providedPropertiesStore.getMangledProperties(graph)
    .filter((method) => graph[method])
    .forEach((method) => {
      graph[method] = graph[method].bind(graph);
    });
}
