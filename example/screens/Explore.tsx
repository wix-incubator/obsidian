import React from 'react';
import {View} from 'react-native-ui-lib';
import baseScreen from './baseScreen';
import MyInjectedComponent from '../components/MyInjectedComponent';

const Explore: () => JSX.Element = () => {
  return (
    <View flex>
      <MyInjectedComponent />
    </View>
  );
};

export default baseScreen(Explore);
