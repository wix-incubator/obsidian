import React, {ComponentType} from 'react';
import {View} from 'react-native-ui-lib';
import TopBarBackground from '../components/TopBarBackground';
import {NavigationComponentProps} from 'react-native-navigation';

interface Props extends NavigationComponentProps {
  title: string;
}

export function baseScreen(
  WrappedComponent: ComponentType<Props>,
): ComponentType<Props> {
  return (props: Props) => (
    <View flex>
      <TopBarBackground title={props.title} />
      <WrappedComponent {...props} />
    </View>
  );
}

export default baseScreen;
