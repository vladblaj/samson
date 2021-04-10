import React from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {Title} from "native-base";
import {useDispatch} from "react-redux";
import actions from "../../actions/actions";
import {Actions} from "react-native-router-flux";
import {THEME} from "../../color-theme";

const CellElement = props => {
  const {id, video, selectedTrack} = props;
  const dispatch = useDispatch();

  const toggleOverlay = () => {
    Actions.youtubeSearchOverlay({onItemSelected: addToCircumstantialMusic, meetingTypeVisible: false, data: video});
  };
  const playSelectedSong = () => {
    dispatch(actions.playSelectedVideo({video, playingIn: 'CIRCUMSTANTIAL'}))
  }

  const addToCircumstantialMusic = (item) => {
    const {video} = item;
    dispatch(actions.addToCircumstantialMusic({id, entry: {...video, key:id}}));
    Actions.pop()
  }

  const getBackgroundColor= ()=>{
    return video && selectedTrack && video.key === selectedTrack.key ? styles.selectedBackgroundColor
        : styles.normalBackgroundColor
  }

  return (
      <View style={[styles.container, getBackgroundColor()]}>
        <TouchableHighlight
            onPress={playSelectedSong}
            onLongPress={toggleOverlay}>
          <Title numberOfLines={1} style={{fontSize: 12, color: 'white'}} on>{video ? video.title : ''}</Title>
        </TouchableHighlight>
      </View>
  );
}
const styles = StyleSheet.create({
  text: {margin: 6},
  selectedBackgroundColor: {
    backgroundColor: THEME.SELECTED,
  },
  normalBackgroundColor: {
    backgroundColor: THEME.SECONDARY_COLOR,
  },
  container: {
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
