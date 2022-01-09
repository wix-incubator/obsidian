import {Navigation} from 'react-native-navigation';
import {Screens, registerScreens} from './screens';
import {setTabsAppRoot} from './services/navigation';

function setAppRoot() {
  setTabsAppRoot([
    {
      componentName: Screens.Explore,
      title: 'Explore',
      icon: require('./assets/tabIcons/explore.png'),
    },
    {
      componentName: Screens.Recipes,
      title: 'Recipes',
      icon: require('./assets/tabIcons/recipes.png'),
    },
    {
      componentName: Screens.MyBar,
      title: 'My Bar',
      icon: require('./assets/tabIcons/my_bar.png'),
    },
    {
      componentName: Screens.Wishlist,
      title: 'Wishlist',
      icon: require('./assets/tabIcons/wishlist.png'),
    },
  ]);
}

export function init() {
  registerScreens();
  Navigation.events().registerAppLaunchedListener(() => setAppRoot());
}
