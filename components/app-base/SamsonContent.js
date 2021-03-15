import React from 'react';
import {StyleSheet} from 'react-native';

import YoutubeMovable from "../youtube-search/YoutubeMovable";
import CircumstantialMusic from "../circumstantial-music/CircumstantialMusic";
import Meeting from "../meeting/Meeting";
import StatusBar from "react-native-web/dist/exports/StatusBar";
import {Content} from "native-base";

const SamsonContent = (props) => {

  return (
      <Content scrollEnabled={false} style={styles.content}>
        <YoutubeMovable ytFrameRef={props.ytFrameRef}/>
        <CircumstantialMusic/>
        <Meeting id={1}/>
        <StatusBar style="auto"/>
      </Content>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'rgb(4,4,4)',
  }
});

export default SamsonContent;
