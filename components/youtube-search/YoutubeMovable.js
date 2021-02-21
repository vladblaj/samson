import YoutubePlayer from "react-native-youtube-iframe";
import React, {useEffect} from 'react';
import MovableView from "../MovableView";
import {useState} from "reinspect";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../actions/actions";

const YoutubeMovable = props => {
  const store = useSelector(state => state);
  const dispatch = useDispatch();
  const [playerState, setPlayerState] = useState();

  useEffect(() => {
    if (playerState === 'playing') {
      if (props.ytFrameRef && props.ytFrameRef.current.getDuration()) {
        props.ytFrameRef.current.getDuration().then(
            currentDuration => {
              dispatch(actions.setFieldValue({name: 'duration', value: Math.floor(currentDuration)}));
            }
        );
      }
    }

  }, [playerState, store.selectedTrack, store.paused])

  const setDurationOnStateChange = (event) => {
    if (event === 'ended' && store.paused === false) {
      props.ytFrameRef.current.seekTo(0);
      dispatch(actions.toggle({name: 'paused'}));
    }
    setPlayerState(event);

  }
  const minimize = () => {
    dispatch(actions.setFieldValue({name: 'isYoutubeVisible', value: false}));
  }
  return (
      <MovableView isVisible={store.isYoutubeVisible}>
        <YoutubePlayer
            onChangeState={setDurationOnStateChange}
            onReady={() => {
              props.ytFrameRef.current.seekTo(0);
            }}
            ref={props.ytFrameRef}
            height={400}
            width={400}
            play={!store.paused}
            videoId={store.selectedTrack}
        />
        <TouchableOpacity style={styles.minimize} onPress={minimize}>
          <Image source={require('../../img/baseline_minimize_black_18dp.png')} style={styles.minimizeImage}/>
        </TouchableOpacity>
      </MovableView>
  );
}
export default YoutubeMovable;
const styles = StyleSheet.create({
  minimize: {
    position: 'absolute',
    zIndex: 1
  },
  minimizeImage: {
    right: 0,
    borderRadius: 3,
    width: 18, height: 18,
    backgroundColor: 'rgb(25,118,209)',
  }
});

