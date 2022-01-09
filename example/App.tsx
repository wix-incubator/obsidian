import React from 'react';
import type {ReactNode} from 'react';
import {SafeAreaView, ScrollView, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import MyInjectedComponent from './MyInjectedComponent';

const App: () => ReactNode = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: 'red',
          }}
        />
        <MyInjectedComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
