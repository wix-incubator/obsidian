import {Navigation} from 'react-native-navigation';
import {name as appName} from './app.json';
import {setTabsAppRoot} from './services/navigation';

function registerComponents() {
  Navigation.registerComponent(appName, () => require('./App').default);
}

function setAppRoot() {
  setTabsAppRoot([
    {
      componentName: appName,
      tabTitle: 'Example',
      tabItemTitle: 'Example',
    },
  ]);
}

export function init() {
  registerComponents();
  Navigation.events().registerAppLaunchedListener(() => setAppRoot());
}
