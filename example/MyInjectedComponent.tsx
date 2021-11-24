import React from 'react';
import {Text, View} from 'react-native';
import {Graph, injectComponent, ObjectGraph, Provides} from 'react-obsidian';

interface DependenciesProps {
  myText: string;
}

@Graph()
class DependenciesGraph extends ObjectGraph<DependenciesProps> {
  @Provides()
  myText(): string {
    return 'Hello injected';
  }
}

const MyInjectedComponent: React.FunctionComponent<DependenciesProps> = ({
  myText,
}: DependenciesProps) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text>{myText || 'default'}</Text>
    </View>
  );
};

// export default injectComponent(MyInjectedComponent, DependenciesGraph);
export default injectComponent(MyInjectedComponent, DependenciesGraph);
