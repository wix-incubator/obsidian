import React, {ComponentType} from 'react';
import {View} from 'react-native-ui-lib';
import TopBarBackground from '../components/TopBarBackground';

export function baseScreen(WrappedComponent: ComponentType): ComponentType {
  return props => (
    <View flex>
      <TopBarBackground title={props.title} />
      <WrappedComponent {...props} />
    </View>
  );
}

export default baseScreen;
