import {Graph, ObjectGraph, Provides} from 'react-obsidian';
import API from '../services/api';

export interface DependenciesProps {
  api: API;
}

@Graph()
export default class DependenciesGraph extends ObjectGraph<DependenciesProps> {
  @Provides()
  api(): API {
    return new API();
  }
}
