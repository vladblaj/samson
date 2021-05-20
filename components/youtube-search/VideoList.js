import React from 'react';
import VideoListItem from "./VideoListItem";
import {FlatList, SafeAreaView} from 'react-native';

const VideoList = props => {
  const renderItem = ({item}) => (
      <VideoListItem
          onVideoSelect={props.onVideoSelect}
          key={item.id.videoId}
          video={item}/>
  );
  return (<SafeAreaView>
        <FlatList
            data={props.videos}
            renderItem={renderItem}
            keyExtractor={item => item.id.videoId}
        />
      </SafeAreaView>
  );

}
export default VideoList;
