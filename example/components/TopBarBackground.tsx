/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import {ImageBackground, StyleSheet} from 'react-native';

const TopBarBackground: (props: {title: string}) => JSX.Element = props => (
  <ImageBackground
    style={style.bgImage}
    source={require('../assets/nav_bg.png')}>
    <View style={style.titleContainer}>
      <Text text40H white>
        {props.title}
      </Text>
    </View>
  </ImageBackground>
);

const style = StyleSheet.create({
  bgImage: {
    width: '100%',
    height: 152,
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopBarBackground;
