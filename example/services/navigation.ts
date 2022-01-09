import {Navigation, ImageResource} from 'react-native-navigation';

export type TabConfig = {
  componentName: string;
  title: string;
  icon?: ImageResource;
  testID?: string;
};

export function setTabsAppRoot(tabsConfig: TabConfig[]) {
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
