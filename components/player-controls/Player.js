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
  const dispatch = useDispatch();
  const [currentPosition, setCurrentPosition] = useState(0);
  const [timer, setTimer] = useState(0);
  const playerRef = props.ytFrameRef;

  const fetchCurrentTime = async () => {
    if (playerRef && playerRef.current && playerRef.current.getCurrentTime) {
      playerRef.current.getCurrentTime().then(
          currentTime => {
            setCurrentPositionBounded(currentTime);
            true;
          }
      ).catch(e => console.log('Vlad'));
    }
  }

  const startFetchingCurrentTime = () => {
    clearInterval(timer);
    const timerVar = setInterval(() => {
      fetchCurrentTime().then();
    }, 500);
    setTimer(timerVar);
  }

  const stopFetchingCurrentTime = () => {
    clearInterval(timer);
  }

  useEffect(() => {
    if (!store.paused) {
      startFetchingCurrentTime();
    }
    if (store.paused) {
      stopFetchingCurrentTime();

    }
  }, [store.selectedTrack, store.paused])
  const seek = (time) => {
    time = Math.round(time);
    setCurrentPositionBounded(time);
    playerRef.current.seekTo(time);
  }

  const onSlidingComplete = (time) => {
    seek(time);
    startFetchingCurrentTime()
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
    if (currentPosition < 10 && store.selectedTrack > 0) {
      /*setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        isChanging: false,
        selectedTrack: this.state.selectedTrack - 1,
      }), 0);*/
    } else {
      setCurrentPositionBounded(0);
    }
  }

  const onForward = () => {
    if (store.selectedTrack < store.tracks.length - 1) {
      setTimeout(() => {
        setCurrentPositionBounded(0);
        dispatch(actions.setFieldValue({name: 'paused', value: false}));
      }, 0);
    }
  }

  const onPressPlay = () => {
    dispatch(actions.setFieldValue({name: 'paused', value: false}));
    startFetchingCurrentTime();
  }

  const onPressPause = () => {
    dispatch(actions.setFieldValue({name: 'paused', value: true}));
    stopFetchingCurrentTime();
  }
  const onSlidingStart = () => {
    stopFetchingCurrentTime();
  }
  return (

      <View style={styles.container}>

        <StatusBar hidden={true}/>

        <SeekBar
            onSlidingStart={onSlidingStart}
            onSlidingComplete={onSlidingComplete}
            onValueChange={onValueChange}
            trackLength={store.duration}
            currentPosition={currentPosition}/>
        <Controls
            onPressRepeat={() => dispatch(actions.toggle({name: 'repeatOn'}))}
            repeatOn={store.repeatOn}
            shuffleOn={store.shuffleOn}
            //forwardDisabled={this.state.selectedTrack === this.props.tracks.length - 1}
            forwardDisabled={true}
            onPressShuffle={() => dispatch(actions.toggle({name: 'shuffleOn'}))}
            onPressPlay={onPressPlay}
            onPressPause={onPressPause}
            onBack={onBack}
            onForward={onForward}
            paused={store.paused}/>
      </View>
  );
}

const styles = {
  container: {
    overflow: 'hidden',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    backgroundColor: 'rgb(4,4,4)',
    height: 270
  },
  audioElement: {
    height: 0,
    width: 0,
  }
};

export default Player;