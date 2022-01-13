import {Navigation} from 'react-native-navigation';

export enum Screens {
  Explore = 'com.react-obsidian.example.explore',
  Recipes = 'com.react-obsidian.example.recipes',
  MyBar = 'com.react-obsidian.example.my-bar',
  Wishlist = 'com.react-obsidian.example.wishlist',
  BottleDetail = 'com.react-obsidian.example.bottle-detail',
}
export function registerScreens() {
  Object.entries({
    [Screens.Explore]: require('./Explore').default,
    [Screens.Recipes]: require('./Recipes').default,
    [Screens.MyBar]: require('./MyBar').default,
    [Screens.Wishlist]: require('./Wishlist').default,
    [Screens.BottleDetail]: require('./BottleDetail').default,
  }).forEach(entry => Navigation.registerComponent(entry[0], () => entry[1]));
}
