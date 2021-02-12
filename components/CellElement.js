import React, {useContext} from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {SamsonContext} from "../store/appStore";
import {Title} from "native-base";

const CellElement = props => {
  const {actions} = useContext(SamsonContext);

  const toggleOverlay = () => {
    actions.toggle({name: 'searchOverlay'})
    actions.setSelectedCircumstantialCell({id: props.id})
  };
  const playSelectedSong = () => {
    actions.playSelectedCircumstantialVideo()
  }
  const {value} = props;

  return (
      <View style={styles.container}>
        <TouchableHighlight
            onPress={playSelectedSong}
            onLongPress={toggleOverlay}
        >
          <Title numberOfLines={3} on>{value}</Title>
        </TouchableHighlight>
      </View>
  );
}
const styles = StyleSheet.create({
  text: {margin: 6},
  container: {
    flexBasis: 0,
    flexGrow: 1,
    margin: 2,
    minWidth: '25%',
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#c8e1ff',
  }
});
export default CellElement;
