import React from 'react';
import {StyleSheet, View} from 'react-native';
import CellElement from "./CellElement";

const CircumstantialMusic = props => {

  return (
      <View style={styles.container}>
        <CellElement value={'1.'}/>
        <CellElement value={'2.'}/>
        <CellElement value={'3.'}/>
        <CellElement value={'4.'}/>
        <CellElement value={'5.'}/>
        <CellElement value={'6.'}/>
        <CellElement value={'7.'}/>
        <CellElement value={'8.'}/>
        <CellElement value={'9.'}/>
        <CellElement value={'10.'}/>
        <CellElement value={'11.'}/>
        <CellElement value={'12.'}/>
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  text: {margin: 6},
});

export default CircumstantialMusic

