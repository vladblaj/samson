import React  from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {Title} from "native-base";
import {useDispatch} from "react-redux";
import actions from "../../actions/actions";
import {Actions} from "react-native-router-flux";
const CellElement = props => {
  const dispatch = useDispatch();

  const toggleOverlay = () => {
    dispatch(actions.setSelectedCircumstantialCell({id: props.id}));
    Actions.youtubeSearchOverlay();
  };
  const playSelectedSong = () => {
    dispatch(actions.setSelectedCircumstantialCell({id: props.id}))
    dispatch(actions.playSelectedCircumstantialVideo({id: props.id}))
  }
  const {value} = props;

  return (
      <View style={styles.container}>
        <TouchableHighlight
            onPress={playSelectedSong}
            onLongPress={toggleOverlay}>
          <Title numberOfLines={1} style={{fontSize: 12, color: 'white'}} on>{value}</Title>
        </TouchableHighlight>
      </View>
  );
}
const styles = StyleSheet.create({
  text: {margin: 6},
  container: {
    backgroundColor: 'rgb(33,33,33)',
    flexBasis: 0,
    flexGrow: 1,
    margin: 2,
    minWidth: '25%',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'rgb(33,33,33)',
  }
});
export default CellElement;