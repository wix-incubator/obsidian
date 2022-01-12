import {Navigation} from 'react-native-navigation';
import {registerScreens} from './screens';
import {Inject, Injectable} from 'react-obsidian';
import DependenciesGraph from './graphs/dependenciesGraph';
import Navigator from './services/navigator';

@Injectable(DependenciesGraph)
class Main {
  @Inject navigator!: Navigator;

  public init() {
    registerScreens();
    Navigation.events().registerAppLaunchedListener(() =>
      this.navigator.setAppRoot(),
    );
  }
}

export default new Main();
