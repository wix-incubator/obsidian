import {Navigation, ImageResource} from 'react-native-navigation';

export type TabConfig = {
  componentName: string;
  tabTitle: string;
  tabItemTitle: string;
  tabItemIcon?: ImageResource;
  tabItemSelectedIcon?: ImageResource;
  tabItemTestID?: string;
};

export function setTabsAppRoot(tabsConfig: TabConfig[]) {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        options: {
          bottomTabs: {
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
                        text: tabConfig.tabTitle,
                      },
                    },
                  },
                },
              },
            ],
            options: {
              bottomTab: {
                text: tabConfig.tabItemTitle,
                icon: tabConfig.tabItemIcon,
                selectedIcon: tabConfig.tabItemSelectedIcon,
                testID: tabConfig.tabItemTestID,
              },
            },
          },
        })),
      },
    },
  });
}
