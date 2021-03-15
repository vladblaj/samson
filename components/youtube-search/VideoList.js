import React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import {List} from "native-base";
import VideoListItem from "./VideoListItem";


const VideoList = props => {
  const videoItems = props.videos.map((video) => {
    return (
        <VideoListItem
            onVideoSelect={props.onVideoSelect}
            key={video.etag}
            video={video}/>
    );
  });
  return (
      <List>
        {videoItems}
      </List>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 42,
  },
});
export default VideoList;
