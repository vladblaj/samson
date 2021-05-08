import React, {useEffect} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {useSelector} from "react-redux";
import {Button, Text, Title, View} from "native-base";
import {useState} from "reinspect";
import YoutubeSearch from "../youtube-search/YoutubeSearch";
import {Actions} from "react-native-router-flux";
import DropDownPicker from 'react-native-dropdown-picker';
import {THEME} from "../../color-theme";
import {formatDate, UUID} from "../../utils";

const Overlay = (props) => {
  const {onItemSelected, meetingTypeVisible} = props;
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  const [selectedMeetingType, setSelectedMeetingType] = useState(props.data && props.data.meetingType);
  const [selectedVideo, setSelectedVideo] = useState(props.data);
  const [selectedVideoLabel, setSelectedVideoLabel] = useState(`Video: ${props.data ? props.data.title : ''}`);
  const meetingTypes = useSelector(state => state.meetingTypes)

  useEffect(() => {
    Animated.timing(opacity, {
      duration: 120,
      toValue: 1,
    }).start();
  }, [])

  const isFormInvalid = () => {
    if (meetingTypeVisible) {
      return selectedVideo === null || selectedMeetingType === null;
    }
    return selectedVideo === null;
  }

  const setVideoItem = (video) => {
    const entry = {
      thumbnail: video.snippet.thumbnails.default.url,
      title: video.snippet.title,
      publishedAt: formatDate(video.snippet.publishedAt),
      channel: video.snippet.channelTitle,
      videoId: video.id.videoId,
      key: props.data ? props.data.key : UUID()
    }
    setSelectedVideoLabel(`Video: ${video.snippet.title}`);
    setSelectedVideo(entry);
  }
  const renderOk = () => {
    return (
        <Button primary style={{backgroundColor: THEME.SECONDARY_COLOR, width: 90, height:39,  justifyContent: 1}}
                onPress={() => onItemSelected({video: selectedVideo, meetingType: selectedMeetingType})}>
          <Text>Ok</Text>
        </Button>
    );
  }
  const renderClose = () => {
    return (
        <Button danger onPress={Actions.pop} style={{
          backgroundColor: THEME.SECONDARY_COLOR,
          width: 90,
          height: 38,
          justifyContent: 1
        }}><Text> Cancel </Text></Button>
    );
  }

  return (
      <Animated.View style={[styles.container, {opacity: opacity}]}>
        <View style={styles.overlayContent}>
          <View style={styles.content}>
            <Title style={styles.title}>Add Meeting </Title>
            {meetingTypeVisible && <Text style={styles.label}>Meeting Type</Text> && <DropDownPicker
                placeholder="Select meeting type"
                items={meetingTypes}
                defaultValue={selectedMeetingType}
                containerStyle={{height: 40, width: '80%', marginBottom: 10,}}
                style={{
                  backgroundColor: THEME.FILLER_COLOR,
                  borderColor: THEME.FILLER_COLOR,
                }}
                itemStyle={{
                  color: 'white',
                  justifyContent: 'flex-start',
                }}
                dropDownStyle={{
                  color: 'white',
                  borderColor: THEME.FILLER_COLOR,
                  backgroundColor: THEME.FILLER_COLOR,
                }}
                onChangeItem={item => {
                  setSelectedMeetingType(item.value)
                }}
            />}
            <Text numberOfLines={1} style={styles.label}>{selectedVideoLabel}</Text>
            <YoutubeSearch onVideoSelect={setVideoItem}/>
          </View>
          <View style={styles.buttons}>
            {renderClose()}
            {renderOk()}
          </View>
        </View>
      </Animated.View>
  );
}
const styles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10,
    color: THEME.FILLER_COLOR,
  },
  buttons: {
    width: '100%',
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  content: {
    width: '100%',
    flexGrow: 2,
    height: '80%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {margin: 6},
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    backgroundColor: 'rgba(43,46,74, 0.5)'
  },
  overlayContent: {
    alignItems: "center",
    backgroundColor: THEME.SECONDARY_COLOR,
    height: '75%',
    width: '90%',
    opacity: 1,
    borderRadius: 4
  },
  title: {
    marginTop: 30,
    marginBottom: 30,
    color: THEME.FILLER_COLOR,
  },
  searchInput: {
    color: THEME.SECONDARY_COLOR
  },
  closeBtnContainer: {
    width: '100%',
    color: THEME.SECONDARY_COLOR,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
});
export default Overlay;
