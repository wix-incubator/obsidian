import {Navigation, ImageResource} from 'react-native-navigation';
import {Screens} from '../screens';

export type TabConfig = {
  componentName: string;
  title: string;
  icon?: ImageResource;
  testID?: string;
};

export default class Navigator {
  public startTabbedApp() {
    Navigation.events().registerAppLaunchedListener(() => this.setAppRoot());
  }

  private setAppRoot() {
    this.setTabsAppRoot([
      {
        componentName: Screens.Explore,
        title: 'Explore',
        icon: require('../assets/tabIcons/explore.png'),
      },
      {
        componentName: Screens.Recipes,
        title: 'Recipes',
        icon: require('../assets/tabIcons/recipes.png'),
      },
      {
        componentName: Screens.MyBar,
        title: 'My Bar',
        icon: require('../assets/tabIcons/my_bar.png'),
      },
      {
        componentName: Screens.Wishlist,
        title: 'Wishlist',
        icon: require('../assets/tabIcons/wishlist.png'),
      },
    ]);
  }

  private setTabsAppRoot(tabsConfig: TabConfig[]) {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          options: {
            bottomTabs: {
              tabsAttachMode: 'afterInitialTab',
              testID: 'bottom_tabs_test_id',
            },
          },
          children: tabsConfig.map(tabConfig => ({
            stack: {
              children: [
                {
                  component: {
                    name: tabConfig.componentName,
                    options: {
                      topBar: {
                        title: {
                          text: tabConfig.title,
                        },
                      },
                    },
                    passProps: {
                      title: tabConfig.title,
                    },
                  },
                },
              ],
              options: {
                topBar: {
                  visible: false,
                  drawBehind: true,
                  translucent: true,
                },
                bottomTab: {
                  text: tabConfig.title,
                  icon: tabConfig.icon,
                  selectedIconColor: '#000000',
                  testID: tabConfig.testID,
                },
              },
            },
          })),
        },
      },
    });
  }
}
