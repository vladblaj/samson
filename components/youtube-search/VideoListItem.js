import React from 'react';
import {ListItem, Title, View} from "native-base";
import {Image, StyleSheet, Text} from "react-native";
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
      <ListItem onPress={() => onVideoSelect(video)} style={styles.listGroupItemListItemCustom}>
        <View style={styles.container}>
          <View style={styles.thumbnail}>
            <Image style={{width, height}} source={{uri: imageUrl}}/>
          </View>
          <View style={styles.mediaBody}>
            <View style={styles.mediaTitle}>
              <Title numberOfLines={4} style={styles.title}>{video.snippet.title}</Title>
            </View>
            <View style={styles.mediaChannelTitle}>
              <Text style={styles.textDetails}>{video.snippet.channelTitle}</Text>
            </View>
            <View style={styles.mediaHeadingChannelDate}>
              <Text style={styles.textDetails}>{date}</Text>
            </View>
          </View>
        </View>
      </ListItem>
  );
};

const styles = StyleSheet.create({
  text: {margin: 6},
  videoListMedia: {flex: 1},
  container: {
    flex: 1,
    flexDirection: 'row',

  },
  mediaBody: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  mediaTitle: {
    margin: 5,
    flexGrow: 2,
    flexBasis: 70
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
    color: THEME.FILLER_COLOR,
    fontWeight: 'bold',
  },
  textDetails: {
    color: THEME.FILLER_COLOR,

  },
  thumbnail: {},
  mediaObject: {width: 100, height: 100},
  listGroupItemListItemCustom: {}
});
export default VideoListItem;