import React from 'react';
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
export default VideoList;
