import {View} from "native-base";
import YoutubePlayer from "react-native-youtube-iframe";
import MovableView from "react-native-movable-view";
import React, {useContext} from 'react';
import {SamsonContext} from "../../store/appStore";

const YoutubeMovable = props => {
  const {store, actions} = useContext(SamsonContext);
  const setDurationOnStateChange = (event) => {
    if(event==='playing'){
      if (props.ytFrameRef && props.ytFrameRef.current.getDuration()) {
        props.ytFrameRef.current.getDuration().then(
            currentDuration => {
              console.log({currentDuration});
              actions.setFieldValue({name: 'duration', value: Math.floor(currentDuration)});
            }
        );
      }
    }
  }
  return (
      <MovableView>
        <View style={{
          width: 100, height: 100,
          backgroundColor:'red',
        }}
        >
          <YoutubePlayer
              onChangeState={setDurationOnStateChange}
              onReady={() => console.log("ready")}
              ref={props.ytFrameRef}
              height={400}
              width={400}
              play={!store.paused}
              videoId={store.selectedTrack}
          />
        </View>
      </MovableView>
  );

}
export default YoutubeMovable;


