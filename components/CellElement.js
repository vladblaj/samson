import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CellElement = props => {
  const {value} = props;

  return (
      <View style={styles.container}>
        <Text>{value}</Text>
      </View>
  );
}
const styles = StyleSheet.create({
  text: {margin: 6},
  container: {
    flexBasis:0,
    flexGrow:1,
    margin: 2,
    minWidth: '25%',
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#c8e1ff',
  }
});
export default CellElement;
