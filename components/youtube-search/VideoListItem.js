import React, {useContext} from 'react';
import {ListItem, Title, View} from "native-base";
import {Image, StyleSheet, Text} from "react-native";
import {SamsonContext} from "../../store/appStore";

const VideoListItem = ({video, onVideoSelect}) => {

  // const video = props.video;
  const imageUrl = video.snippet.thumbnails.default.url;
  const width = video.snippet.thumbnails.default.width;
  const height = video.snippet.thumbnails.default.height;
  // implement your own date script, this is just an example
  let date = video.snippet.publishedAt;
  let YYYY = new Date(date).toJSON().slice(0, 4);
  let MM = new Date(date).toJSON().slice(5, 7);
  let DD = new Date(date).toJSON().slice(8, 10);
  let mmName = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  };
  date = mmName[MM] + ' ' + DD + ', ' + YYYY;

  return (
      <ListItem onPress={() => onVideoSelect(video)} style={styles.listGroupItemListItemCustom}>
        <View style={styles.container}>
          <View style={styles.thumbnail}>
            <Image style={{width, height}} source={{uri: imageUrl}}/>
          </View>
          <View style={styles.mediaBody}>
            <View style={styles.mediaTitle}>
              <Title numberOfLines={3} style={styles.title}>{video.snippet.title}</Title>
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
    flexWrap: 'wrap',
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
    color: 'rgb(255,255,255)',
    fontWeight: 'bold',
  },
  textDetails: {
    color: 'rgb(170,170,170)',

  },
  thumbnail: {},
  mediaObject: {width: 100, height: 100},
  listGroupItemListItemCustom: {}
});
export default VideoListItem;