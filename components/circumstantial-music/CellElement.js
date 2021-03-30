import React  from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {Title} from "native-base";
import {useDispatch} from "react-redux";
import actions from "../../actions/actions";
import {Actions} from "react-native-router-flux";
import {THEME} from "../../color-theme";
const CellElement = props => {
  const dispatch = useDispatch();

  const toggleOverlay = () => {
    dispatch(actions.setSelectedCircumstantialCell({id: props.id}));
    Actions.youtubeSearchOverlay({onItemSelected: addToCircumstantialMusic, meetingTypeVisible: false });
  };
  const playSelectedSong = () => {
    dispatch(actions.setSelectedCircumstantialCell({id: props.id}))
    dispatch(actions.playSelectedCircumstantialVideo({id: props.id}))
  }
  const {value} = props;

  const addToCircumstantialMusic = (item) => {
    dispatch(actions.addToCircumstantialMusic(item.video));
    Actions.pop()
  }

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
    backgroundColor: THEME.SECONDARY_COLOR,
    flexBasis: 0,
    flexGrow: 1,
    margin: 2,
    minWidth: '25%',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: THEME.SECONDARY_COLOR,
  }
});
export default CellElement;
