import React, {useContext, useEffect} from 'react';
import {useState} from "reinspect";

import {StatusBar,} from 'react-native';
import {View} from 'native-base';
import SeekBar from './SeekBar';
import Controls from './Controls';
import {SamsonContext} from "../store/appStore";

const Player = (props) => {
  const {store, actions} = useContext(SamsonContext);
  const [currentPosition, setCurrentPosition] = useState(0);
  const playerRef = props.ytFrameRef;

  useEffect(() => {
    const timer = setInterval(() => {
      const fetchData = async () => {
        if (playerRef && playerRef.current.getCurrentTime) {
          playerRef.current.getCurrentTime().then(
              currentTime => {
                setCurrentPosition(Math.floor(currentTime));
              }
          );
        }
      }
      fetchData().then();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [props.ytFrameRef]);

  const seek = (time) => {
    time = Math.round(time);
    setCurrentPosition(Math.floor(time));
    actions.setFieldValue({name: 'paused', value: false});
    playerRef.current.seekTo(time);
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
      setCurrentPosition(0);
    }
  }

  const onForward = () => {
    if (store.selectedTrack < store.tracks.length - 1) {
      setTimeout(() => {
        setCurrentPosition(0);
        actions.setFieldValue({name: 'paused', value: false});
      }, 0);
    }
  }

  const onPressPlay = () => {
    actions.setFieldValue({name: 'paused', value: false});
  }

  return (

      <View style={styles.container}>

        <StatusBar hidden={true}/>

        <SeekBar
            onSeek={seek}
            trackLength={store.duration}
            onSlidingStart={() => actions.setFieldValue({name: 'paused', value: true})}
            currentPosition={currentPosition}/>
        <Controls
            onPressRepeat={() => actions.toggle({name: 'repeatOn'})}
            repeatOn={store.repeatOn}
            shuffleOn={store.shuffleOn}
            //forwardDisabled={this.state.selectedTrack === this.props.tracks.length - 1}
            forwardDisabled={true}
            onPressShuffle={() => actions.toggle({name: 'shuffleOn'})}
            onPressPlay={onPressPlay}
            onPressPause={() => actions.setFieldValue({name: 'paused', value: true})}
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