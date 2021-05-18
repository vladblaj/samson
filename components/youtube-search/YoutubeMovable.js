import YoutubePlayer from "react-native-youtube-iframe";
import React, {useEffect} from 'react';
import MovableView from "../misc/MovableView";
import {useState} from "reinspect";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../actions/actions";
import {View} from "native-base";
import {THEME} from "../../color-theme";

const YoutubeMovable = props => {
  const store = useSelector(state => state);
  const dispatch = useDispatch();
  const [playerState, setPlayerState] = useState();

  useEffect(() => {

    if (playerState === 'playing') {
      if (props.ytFrameRef && props.ytFrameRef.current.getDuration()) {
        if(!store.selectedTrack.duration){
          console.log('will get duration');
          props.ytFrameRef.current.getDuration().then(
              currentDuration => {
                store.selectedTrack.duration = currentDuration;
                dispatch(actions.updateDurationForVideo(store.selectedTrack));
              }
          );
        }
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
  const minimize = (e) => {
    dispatch(actions.setFieldValue({name: 'isYoutubeVisible', value: false}));
    e.stopPropagation();
  }

  const start = store.selectedTrack?store.selectedTrack.start:null;
  const end =  store.selectedTrack?store.selectedTrack.end:null;
  const key = store.selectedTrack?`${store.selectedTrack.key}${start}${end}`:1;
  return (
      <MovableView isVisible={store.isYoutubeVisible}>
          <TouchableOpacity style={styles.minimize} onPress={minimize}>
            <Image source={require('../../img/baseline_minimize_black_18dp.png')} style={styles.minimizeImage}
                   onPress={minimize}/>
          </TouchableOpacity>
          <View pointerEvents="none">
            <YoutubePlayer
                key={key}
                baseUrlOverride={'https://smash93.github.io/hostedYoutubeFiles/youtube-host.html'}
                onChangeState={setDurationOnStateChange}
                onReady={() => {
                  dispatch(actions.setFieldValue({name: 'videoState', value: 'ready'}));
                }}
                ref={props.ytFrameRef}
                height={230}
                width={400}
                play={!store.paused}
                videoId={store.selectedTrack?store.selectedTrack.videoId:null}
                initialPlayerParams={{controls: 0, start, end}}
                webViewProps={{mediaPlaybackRequiresUserAction:false}}
            />
          </View>
      </MovableView>
  );
}
export default YoutubeMovable;
const styles = StyleSheet.create({
  minimize: {
    position: 'absolute',
    zIndex: 1,
  },
  minimizeImage: {
    right: 0,
    borderRadius: 3,
    width: 25, height: 25,
    backgroundColor: THEME.NEUTRAL_COLOR,
  }
});


