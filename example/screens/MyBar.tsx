import React from 'react';
import {
  GridListItem,
  Text,
  Constants,
  BorderRadiuses,
  Shadows,
} from 'react-native-ui-lib';
import {FlatList, SectionList, StyleSheet} from 'react-native';
import baseScreen from './baseScreen';

const kNumColumns = 2;
const kSpacing = 20;
const kItemWidth = Math.floor(
  (Constants.screenWidth - ((kNumColumns - 1) * kSpacing + 2 * kSpacing)) /
    kNumColumns,
);
const kItemHeight = kItemWidth * 1.27;

const myBarData = require('../mockData/myBar.json');

const MyBar: () => JSX.Element = () => {
  return (
    <SectionList
      sections={myBarData}
      keyExtractor={(section, index) => section.name + index}
      renderSectionHeader={({section: {title}}) => (
        <Text text60 marginL-15>
          {title}
        </Text>
      )}
      renderItem={({item}) => (
        <FlatList
          numColumns={kNumColumns}
          keyExtractor={bottle => bottle.image}
          data={item}
          renderItem={({item: bottle}) => (
            <GridListItem
              containerStyle={style.gridItemContainer}
              itemSize={{width: kItemWidth, height: kItemHeight}}
              imageProps={{source: {uri: bottle.image}}}
              title={bottle.name}
              titleTypography={'text80BO'}
            />
          )}
        />
      )}
    />
  );
};

const style = StyleSheet.create({
  gridItemContainer: {
    ...Shadows.sh20.bottom,
    marginLeft: kSpacing,
    marginBottom: kSpacing,
    marginTop: kSpacing,
    backgroundColor: 'white',
    borderRadius: BorderRadiuses.br40,
  },
});

export default baseScreen(MyBar);
