import React, {useContext, useEffect, useRef, useState} from 'react';
import {StatusBar,} from 'react-native';
import {View} from 'native-base';
import SeekBar from './SeekBar';
import Controls from './Controls';
import YoutubePlayer from "react-native-youtube-iframe";
import {SamsonContext} from "../store/appStore";

const Player = () => {
  const {store, actions} = useContext(SamsonContext);
  const playerRef = useRef();
  const [paused, setPaused] = useState(true);
  const [totalLength, setTotalLength] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [repeatOn, setRepeatOn] = useState(false);
  const [shuffleOn, setShuffleOn] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('AVAc1gYLZK0');

  useEffect(() => {
    const timer = setInterval(() => {
      const fetchData = async () => {
        playerRef.current?.getCurrentTime().then(
            currentTime => {
              console.log({currentTime});
              setCurrentPosition(Math.floor(currentTime));
            }
        );
      }
      fetchData();
    }, 500);
    playerRef.current?.getDuration().then(
        getDuration => {
          console.log({getDuration});
          setTotalLength(Math.floor(data.duration));
        }
    );
    return () => {
      clearInterval(timer);
    };
  }, [playerRef]);
  const setDuration = (data) => {
    // console.log(totalLength);
    setTotalLength(Math.floor(data.duration));
  }

  const setTime = (data) => {
    //console.log(data);
    setCurrentPosition(Math.floor(data.currentTime));
  }

  const seek = (time) => {
    time = Math.round(time);
    setCurrentPosition(time);
    setPaused(false);
    playerRef.current.seekTo(time);
  }

  const onBack = () => {
    if (currentPosition < 10 && selectedTrack > 0) {
      setIsChanging(true);
      /*setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        totalLength: 1,
        isChanging: false,
        selectedTrack: this.state.selectedTrack - 1,
      }), 0);*/
    } else {
      setCurrentPosition(0);
    }
  }

  const onForward = () => {
    if (selectedTrack < store.tracks.length - 1) {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentPosition(0);
        setTotalLength(1);
        setPaused(false);
        setIsChanging(false);
        //setselectedTrack: this.state.selectedTrack + 1,
      }, 0);
    }
  }

  return (

      <View style={styles.container}>
        <YoutubePlayer
            initialPlayerParams={false}
            ref={playerRef}
            height={300}
            width={300}
            play={!paused}
            videoId={currentTrack}
        />
        <StatusBar hidden={true}/>

        <SeekBar
            onSeek={seek}
            trackLength={totalLength}
            onSlidingStart={() => setPaused(true)}
            currentPosition={currentPosition}/>
        <Controls
            onPressRepeat={() => setRepeatOn(!repeatOn)}
            repeatOn={repeatOn}
            shuffleOn={shuffleOn}
            //forwardDisabled={this.state.selectedTrack === this.props.tracks.length - 1}
            forwardDisabled={true}
            onPressShuffle={() => setShuffleOn(!shuffleOn)}
            onPressPlay={() => setPaused(false)}
            onPressPause={() => setPaused(true)}
            onBack={onBack}
            onForward={onForward}
            paused={paused}/>
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
  },
  audioElement: {
    height: 0,
    width: 0,
  }
};

export default Player;