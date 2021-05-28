import React, {useEffect} from 'react';
import {useState} from "reinspect";

import {StatusBar,} from 'react-native';
import {View} from 'native-base';
import SeekBar from './SeekBar';
import Controls from './Controls';
import {useDispatch, useSelector} from "react-redux";
import actions from "../../actions/actions";

const Player = (props) => {
  const store = useSelector(state => state);
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const [currentPosition, setCurrentPosition] = useState(0);
  const [timer, setTimer] = useState(0);
  const playerRef = props.ytFrameRef;
  const trackLength = store.selectedTrack ?store.selectedTrack.end || store.selectedTrack.duration : 1;
  const getVideoStart = () => {
    return store.selectedTrack?.start || 0;
  }
  const videoStart = getVideoStart();
  const fetchCurrentTime = async () => {

    const currentTime = await playerRef.current?.getCurrentTime();
    console.log('will fetch current time', currentTime, trackLength);
    setCurrentPositionBounded(currentTime);
  }

  const startFetchingCurrentTime = () => {
    clearInterval(timer);
    const timerVar = setInterval(() => {
      fetchCurrentTime().then();
    }, 500);
    setTimer(timerVar);
  }

  const stopFetchingCurrentTime = () => {
    console.log('will clear interval');
    clearInterval(timer);
  }

  useEffect(() => {
    console.log(store.videoState)
    if (!store.paused && store.videoState === 'ready') {
      console.log('store-ul nu e paused');
      startFetchingCurrentTime();
    }
    if (store.paused) {
      console.log('WIll delete fetch current time');
      stopFetchingCurrentTime();
    }
    if (store.videoState === 'ready') {
      stopFetchingCurrentTime();
    }
  }, [store.selectedTrack, store.paused, store.videoState])

  useEffect(() => {
    if(currentPosition === trackLength && store.videoState==='ready')
    {
      setTimeout(()=>dispatch(actions.playNext()) , 1500);
    }
  }, [currentPosition])

  const seek = (time) => {
    time = Math.round(time);
    setCurrentPositionBounded(time);
    playerRef.current.seekTo(time);
  }

  const onSlidingComplete = (time) => {
    seek(time);
    if (!store.paused) {
      startFetchingCurrentTime()

    }
  }

  const onValueChange = (time) => {
    time = Math.round(time);
    setCurrentPositionBounded(time);
  }

  const setCurrentPositionBounded = (time) => {
    if (time < 0.01) {
      setCurrentPosition(0);
    }
    setCurrentPosition(Math.floor(time));
  }

  const onBack = () => {
    seek(0);
    setCurrentPositionBounded(0);
    stopFetchingCurrentTime();
    dispatch(actions.playPrevious());
  }

  const onForward = () => {
    seek(0);
    setCurrentPositionBounded(0);
    stopFetchingCurrentTime();
    dispatch(actions.playNext());
  }

  const onPressPlay = () => {
    dispatch(actions.setFieldValue({name: 'paused', value: false}));
  }

  const onPressPause = () => {
    dispatch(actions.setFieldValue({name: 'paused', value: true}));
  }
  const onSlidingStart = () => {
    stopFetchingCurrentTime();
  }
  const videoCropped = store.selectedTrack ? store.selectedTrack.start || store.selectedTrack.end : false;
  return (

      <View style={[styles.container, {backgroundColor: theme.PRIMARY_COLOR}]}>

        <StatusBar hidden={true}/>

        <SeekBar
            videoCropped={videoCropped}
            videoStart={videoStart}
            videoEnd={trackLength}
            onSlidingStart={onSlidingStart}
            onSlidingComplete={onSlidingComplete}
            onValueChange={onValueChange}
            currentPosition={currentPosition}
            theme={theme}
        />
        <Controls
            onPressRepeat={() => dispatch(actions.toggle({name: 'repeatOn'}))}
            repeatOn={store.repeatOn}
            shuffleOn={store.shuffleOn}
            //forwardDisabled={this.state.selectedTrack === this.props.tracks.length - 1}
            forwardDisabled={false}
            onPressShuffle={() => dispatch(actions.toggle({name: 'shuffleOn'}))}
            onPressPlay={onPressPlay}
            onPressPause={onPressPause}
            onBack={onBack}
            onForward={onForward}
            paused={store.paused}
            theme={theme}/>
      </View>
  );
}

const styles = {
  container: {
    overflow: 'hidden',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    height: 270
  },
  audioElement: {
    height: 0,
    width: 0,
  }
};

export default Player;