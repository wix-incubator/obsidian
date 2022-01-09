import {Navigation} from 'react-native-navigation';

export enum Screens {
  Explore = 'com.react-obsidian.example.explore',
  Recipes = 'com.react-obsidian.example.recipes',
  MyBar = 'com.react-obsidian.example.my-bar',
  Wishlist = 'com.react-obsidian.example.wishlist',
}

export function registerScreens() {
  Navigation.registerComponent(
    Screens.Explore,
    () => require('./Explore').default,
  );
  Navigation.registerComponent(
    Screens.Recipes,
    () => require('./Recipes').default,
  );
  Navigation.registerComponent(Screens.MyBar, () => require('./MyBar').default);
  Navigation.registerComponent(
    Screens.Wishlist,
    () => require('./Wishlist').default,
  );
}
