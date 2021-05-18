import React from 'react';
import {StyleSheet, Text, View,} from 'react-native';
import Slider from "@react-native-community/slider";
import {THEME} from "../../color-theme";
import {minutesAndSeconds} from "../../utils";

const SeekBar = ({
  currentPosition,
  onSlidingComplete,
  onSlidingStart,
  onValueChange,
  videoStart,
  videoEnd,
  videoCropped
}) => {
  return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>
            {minutesAndSeconds(currentPosition)}
          </Text>
          <View style={{flex: 1}}/>
          <Text style={[styles.text, {width: 65}]}>
            {videoEnd > 1 && "-" + minutesAndSeconds(videoEnd-currentPosition)}
          </Text>
        </View>
        <Slider
            maximumValue={videoEnd}
            minimumValue={videoStart}
            onSlidingStart={onSlidingStart}
            onSlidingComplete={onSlidingComplete}
            onValueChange={onValueChange}
            value={currentPosition}
            style={styles.slider}
            minimumTrackTintColor={videoCropped?THEME.SELECTED:THEME.WHITE}
            maximumTrackTintColor={videoCropped?THEME.SELECTED:THEME.WHITE}
            thumbTintColor={videoCropped?THEME.SELECTED: THEME.WHITE}
            thumbStyle={styles.thumb}
            trackStyle={styles.track}/>
      </View>
  );
};

export default SeekBar;

const styles = StyleSheet.create({
  slider: {
    transform: [{scaleX: 0.9}, {scaleY: 0.9}],
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  text: {
    color: THEME.FILLER_COLOR,
    fontSize: 12,
    textAlign: 'center',

  }
});