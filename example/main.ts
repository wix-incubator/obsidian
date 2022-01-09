import {Navigation} from 'react-native-navigation';
import {Screens, registerScreens} from './screens';
import {setTabsAppRoot} from './services/navigation';

function setAppRoot() {
  setTabsAppRoot([
    {
      componentName: Screens.Main,
      tabTitle: 'Example',
      tabItemTitle: 'Example',
    },
  ]);
}

export function init() {
  registerScreens();
  Navigation.events().registerAppLaunchedListener(() => setAppRoot());
}
