import {Graph, ObjectGraph, Provides, Singleton} from 'react-obsidian';
import API from '../services/api';
import Navigator from '../services/navigator';

export interface DependenciesProps {
  api: API;
  navigator: Navigator;
}

@Singleton()
@Graph()
export default class DependenciesGraph extends ObjectGraph<DependenciesProps> {
  @Provides()
  api(): API {
    return new API();
  }

  @Provides()
  navigator(): Navigator {
    return new Navigator();
  }
}
