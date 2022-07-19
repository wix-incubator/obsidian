import React, {useState} from 'react';
import type {ReactNode} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import MyInjectedComponent from './MyInjectedComponent';
import MyInjectedMemoComponent from './MyInjectedMemoComponent';

const App: () => ReactNode = () => {
  const [testProp, setTestProp] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Button title="Press me" onPress={() => setTestProp(!testProp)} />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <MyInjectedComponent testProp={testProp} />
          {/* UNCOMMENT LINE BELOW TO GET ERROR */}
          {/* <MyInjectedMemoComponent testProp={testProp} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
