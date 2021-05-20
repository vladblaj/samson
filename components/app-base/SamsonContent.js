import React from 'react';
import { StyleSheet} from 'react-native';

import YoutubeMovable from "../youtube-search/YoutubeMovable";
import CircumstantialMusic from "../circumstantial-music/CircumstantialMusic";
import Meeting from "../meeting/Meeting";
import StatusBar from "react-native-web/dist/exports/StatusBar";
import {Content} from "native-base";
import {THEME} from "../../color-theme";
import {useSelector} from "react-redux";

const SamsonContent = (props) => {
  const theme  = useSelector(state => state.theme);
  return (
      <Content scrollEnabled={false}  style={[styles.content,{backgroundColor: theme.PRIMARY_COLOR}]}>
        <YoutubeMovable ytFrameRef={props.ytFrameRef}/>
        <CircumstantialMusic/>
        <Meeting id={1}/>
        <StatusBar style="auto"/>
      </Content>
  );
}

const styles = StyleSheet.create({
  content: {
    height: '80%',
  }
});

export default SamsonContent;
