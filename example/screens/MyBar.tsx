import React from 'react';
import {GridListItem} from 'react-native-ui-lib';
import {FlatList} from 'react-native';
import baseScreen from './baseScreen';

const myBarData = require('../mockData/myBar.json');

const MyBar: () => JSX.Element = () => {
  return (
    <FlatList
      horizontal={false}
      numColumns={2}
      keyExtractor={item => item.image}
      data={myBarData.spirits.items}
      renderItem={({item}) => {
        console.log(`***** item: ${JSON.stringify(item)}`);
        return (
          <GridListItem
            imageProps={{source: {uri: item.image}}}
            itemSize={{width: 50, height: 70}}
            title={item.name}
            titleTypography={'bodySmall'}
            alignToStart
          />
        );
      }}
    />
  );
};

export default baseScreen(MyBar);
