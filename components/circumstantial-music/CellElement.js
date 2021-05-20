import React from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {Title} from "native-base";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../actions/actions";
import {Actions} from "react-native-router-flux";


const CellElement = props => {
  const {id, video, selectedTrack} = props;
  const dispatch = useDispatch();
  const theme  = useSelector(state => state.theme);

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
    return video && selectedTrack && video.key === selectedTrack.key ? {backgroundColor: theme.SELECTED}
        : {backgroundColor: theme.SECONDARY_COLOR}
  }

  return (
      <View style={[styles.container, getBackgroundColor(), {borderColor: theme.SECONDARY_COLOR}]}>
        <TouchableHighlight
            underlayColor={theme.NEUTRAL_COLOR}
            onPress={playSelectedSong}
            onLongPress={toggleOverlay}>
          <Title numberOfLines={1} style={{fontSize: 12, color: theme.WHITE}} on>{video ? video.title : ''}</Title>
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
    borderRadius: 4,
    borderWidth: 2,
  }
});
export default CellElement;
