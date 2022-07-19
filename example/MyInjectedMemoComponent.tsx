import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {Graph, injectComponent, ObjectGraph, Provides} from 'react-obsidian';

interface DependenciesProps {
  myText: string;
  testProp: boolean;
}

@Graph()
class DependenciesGraph extends ObjectGraph<DependenciesProps> {
  @Provides()
  firstDependency(): string {
    return 'firstDependency';
  }

  @Provides()
  secondDependency(): string {
    return 'secondDependency';
  }

  @Provides()
  myText(firstDependency: string, secondDependency: string): string {
    return `Hello injected from ${firstDependency} + ${secondDependency}`;
  }
}

const MyInjectedMemoComponent: React.FunctionComponent<DependenciesProps> =
  memo(({myText, testProp}: DependenciesProps) => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>{myText || 'default'}</Text>
        <Text>{testProp ? 'On' : 'Off'}</Text>
      </View>
    );
  });

export default injectComponent(MyInjectedMemoComponent, DependenciesGraph);
