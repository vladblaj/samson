import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BaseLightBox from '../misc/BaseLightBox';
import {THEME} from "../../color-theme";
import YoutubePlayer from "react-native-youtube-iframe";
import {getYoutubeVideoDuration} from "../../api/YoutubeApi";
import {minutesAndSeconds, youtubeDurationToSeconds} from "../../utils";
import actions from "../../actions/actions";
import {useDispatch} from "react-redux";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {getYoutubeMeta} from 'react-native-youtube-iframe';


const CropVideoOverlay = ({verticalPercent, horizontalPercent, video, setVideoDuration, setVideoStart, setVideoEnd}) => {
  const frameRef = useRef();
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(video.duration)
  const [playerState, setPlayerState] = useState();

  useEffect(() => {
    if (!video.duration) {
      console.log('will fetch duration');
      getYoutubeVideoDuration(video.videoId).then(res => {
        const durationSeconds = youtubeDurationToSeconds(res.data.items[0].contentDetails.duration);
        setVideoDuration(durationSeconds);
        setDuration(durationSeconds);
      })
    }
  }, [])

  useEffect(() => {
    if (playerState === 'playing') {
      dispatch(actions.setFieldValue({name: 'paused', value: true}));
    }
  }, [playerState])

  const onChangeSlider = (values) => {
    console.log('se apeleaza on change slider');
    const min = values[0];
    const max = values[1];
    if (video.start === min && video.end !== max) {
      frameRef.current.seekTo(max);
    }
    if (video.end === max && video.start !== min) {
      frameRef.current.seekTo(min);
    }
    setVideoStart(min === 0 ? null : min);
    setVideoEnd(max === duration ? null : max);
  }
  return (
      <BaseLightBox  verticalPercent={verticalPercent} horizontalPercent={horizontalPercent}>
        <View style={styles.container}>
          <YoutubePlayer
              onChangeState={setPlayerState}
              ref={frameRef}
              height={210}
              width={344}
              videoId={video.videoId}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>
              {minutesAndSeconds(video.start?video.start:0)}
            </Text>
            <View style={{flex: 1}}/>
            <Text style={[styles.text, {width: 70}]}>
              {minutesAndSeconds(video.end?video.end:duration)}
            </Text>
          </View>
          <MultiSlider
              markerStyle={{
                height: 20,
                width: 20,
                borderRadius: 20,
                slipDisplacement: 40,
              }}
              selectedStyle={{
                backgroundColor: THEME.SELECTED,
              }}
              unselectedStyle={{
                backgroundColor: 'silver',
              }}
              values={[video.start?video.start:0, video.end?video.end:duration]}
              sliderLength={320}
              onValuesChange={onChangeSlider}
              min={0}
              max={duration}
              step={1}
              allowOverlap={false}
              snapped
          />
        </View>
      </BaseLightBox>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    flex: 1,
    backgroundColor: THEME.SECONDARY_COLOR,
  },
  text: {margin: 6, color: THEME.FILLER_COLOR},
});

export default CropVideoOverlay

