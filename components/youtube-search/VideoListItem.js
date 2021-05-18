import React from 'react';
import {ListItem, Title, View} from "native-base";
import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";
import {THEME} from "../../color-theme";
import {formatDate} from "../../utils";

const VideoListItem = ({video, onVideoSelect}) => {

  // const video = props.video;
  const imageUrl = video.snippet.thumbnails.default.url;
  const width = video.snippet.thumbnails.default.width;
  const height = video.snippet.thumbnails.default.height;
  // implement your own date script, this is just an example
  let date = formatDate(video.snippet.publishedAt);

  return (
      <TouchableOpacity onPress={() => onVideoSelect(video)}  style={styles.container}>
          <View>
            <Image style={{width, height}} source={{uri: imageUrl}}/>
          </View>
          <View style={styles.mediaBody}>
            <View style={styles.mediaTitle}>
              <Title numberOfLines={2} style={styles.title}>{video.snippet.title}</Title>
            </View>
            <View style={styles.mediaChannelTitle}>
              <Text style={styles.textDetails}>{video.snippet.channelTitle}</Text>
            </View>
            <View style={styles.mediaHeadingChannelDate}>
              <Text style={styles.textDetails}>{date}</Text>
            </View>
          </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {margin: 6},
  videoListMedia: {flex: 1},
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    marginVertical: 6,
  },
  mediaBody: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  mediaTitle: {
    flexGrow: 2,
    flexBasis: 70,
  },
  mediaChannelTitle: {
    marginLeft: 10,
    flexGrow: 1,
    flexBasis: 20
  },
  mediaHeadingChannelDate: {
    marginLeft: 10,
    flexGrow: 1,
    flexBasis: 20
  },
  title: {
    color: THEME.WHITE,
    fontWeight: 'bold',
  },
  textDetails: {
    color: THEME.WHITE,

  },
  mediaObject: {width: 100, height: 100},
});
export default VideoListItem;