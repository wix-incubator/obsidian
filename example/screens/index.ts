import {Navigation} from 'react-native-navigation';

export enum Screens {
  Main = 'com.react-obsidian.main-screen',
}

export function registerScreens() {
  Navigation.registerComponent(Screens.Main, () => require('./App').default);
}
