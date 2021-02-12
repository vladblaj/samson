import React, {useContext} from 'react';
import {Animated, StyleSheet, Text, View,} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import YoutubePlayer from "react-native-youtube-iframe";
import {SamsonContext} from "../store/appStore";
import {useState} from "reinspect";

let dropzoneHeight = 200;
let itemHeight = 100;

const DraggableCard = ({item}) => {

  const [playerHeight, setPlayerHeight] = useState(20);
  const {store} = useContext(SamsonContext);

  let translateX = new Animated.Value(0);
  let translateY = new Animated.Value(0);
  let height = new Animated.Value(20);
  height.addListener((progress) => {
    console.log(progress.value);
    setPlayerHeight(progress.value);
  });
  let onGestureEvent = Animated.event([
    {
      nativeEvent: {
        translationX: translateX,
        translationY: translateY,
      },
    },
  ]);
  let onGestureTopEvent = Animated.event([
    {
      nativeEvent: {
        translationY: height,
      },
    },
  ]);
  let _lastOffset = {x: 0, y: 0};
  let onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      _lastOffset.x += event.nativeEvent.translationX;
      _lastOffset.y += event.nativeEvent.translationY;
      translateX.setOffset(_lastOffset.x);
      translateX.setValue(0);
      translateY.setOffset(_lastOffset.y);
      translateY.setValue(0);
    }
  };
  return (
      <View>
        <PanGestureHandler onGestureEvent={onGestureTopEvent}>
          <Animated.View
              style={{
                width: 100,
                height,
                backgroundColor: 'blue',
                transform: [{translateX}, {translateY}],
              }}
          >

            <YoutubePlayer
                style={{
                  padding: 30,
                }}
                ref={store.playerRef}
                height={playerHeight}
                width={50}
                play={!store.paused}
                videoId={store.selectedTrack}
            />

          </Animated.View>
        </PanGestureHandler>
        <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}>
          <Animated.View

              style={[
                styles.item,
                {transform: [{translateX}, {translateY}]},
              ]}>

            <Text>{item.id}</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
  );
};

export default DraggableCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: 100,
    height: itemHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});
