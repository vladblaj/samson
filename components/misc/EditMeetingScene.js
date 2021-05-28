import React, {useEffect} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {Button, Icon, Input, Item, Text, Title, View} from "native-base";
import {useState} from "reinspect";
import YoutubeSearch from "../youtube-search/YoutubeSearch";
import {Actions} from "react-native-router-flux";
import DropDownPicker from 'react-native-dropdown-picker';
import {formatDate, UUID} from "../../utils";
import actions from "../../actions/actions";

const EditMeetingScene = (props) => {
  const {onItemSelected, meetingTypeVisible} = props;
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  const [selectedMeetingType, setSelectedMeetingType] = useState(props.data && props.data.meetingType);
  const [selectedVideo, setSelectedVideo] = useState(props.data);
  const [selectedVideoLabel, setSelectedVideoLabel] = useState(`Video: ${props.data ? props.data.title : ''}`);
  const meetingTypes = useSelector(state => state.meetingTypes)
  const theme = useSelector(state => state.theme)

  const dispatch = useDispatch();

  useEffect(() => {
    Animated.timing(opacity, {
      duration: 120,
      toValue: 1,
      useNativeDriver: true
    }).start();
  }, [])

  const setVideoDuration = (duration) => {
    selectedVideo.duration = duration;
    setSelectedVideo(selectedVideo);
    dispatch(actions.updateDurationForVideo(selectedVideo));
  }

  const setVideoStart = (start) => {
    selectedVideo.start = start;
    setSelectedVideo(selectedVideo);
  }

  const setVideoEnd = (end) => {
    selectedVideo.end = end;
    setSelectedVideo(selectedVideo);
  }

  const setVideoItem = (video) => {
    const entry = {
      thumbnail: video.snippet.thumbnails.default.url,
      title: video.snippet.title,
      publishedAt: formatDate(video.snippet.publishedAt),
      channel: video.snippet.channelTitle,
      videoId: video.id.videoId,
      key: props.data ? props.data.key : UUID(),
      duration: video.duration,
      start: video.start,
      end: video.end
    }
    setSelectedVideoLabel(`${video.snippet.title}`);
    setSelectedVideo(entry);
  }
  const renderOk = () => {
    return (
        <Button primary style={{backgroundColor: theme.SECONDARY_COLOR, width: 90, height: 39, justifyContent: 1}}
                onPress={() => onItemSelected({video: selectedVideo, meetingType: selectedMeetingType})}>
          <Text style={{color:theme.WHITE}} >Ok</Text>
        </Button>
    );
  }
  const renderClose = () => {
    return (
        <Button danger onPress={Actions.pop} style={{
          backgroundColor: theme.SECONDARY_COLOR,

          width: 90,
          height: 38,
          justifyContent: 1
        }}><Text style={{color:theme.WHITE}}> Cancel </Text></Button>
    );
  }

  return (
      <Animated.View style={[styles.container, {opacity: opacity}]}>
        <View style={[styles.overlayContent, {backgroundColor: theme.SECONDARY_COLOR}]}>
          <View style={styles.content}>
            <Title style={[styles.title, {color: theme.WHITE}]}>Add Meeting</Title>
            <Item style={{borderColor: 'transparent'}}>
              <Input placeholderTextColor={theme.WHITE} style={[styles.label, {borderColor: theme.SECONDARY_COLOR, color: theme.WHITE}]}
                     placeholder={selectedVideoLabel}/>
              <Icon active name='crop-outline' style={{color: theme.FILLER_COLOR}}
                    onPress={() => Actions.cropVideo({
                      verticalPercent: 0.45,
                      horizontalPercent: 1,
                      video: selectedVideo,
                      setVideoDuration,
                      setVideoStart,
                      setVideoEnd
                    })}/>
            </Item>

            {meetingTypeVisible && <Text style={[styles.label, {color: theme.FILLER_COLOR}]}>Meeting Type</Text> &&
            <DropDownPicker
                labelStyle={{color: theme.WHITE}}
                placeholder="Select meeting section"
                items={meetingTypes}
                defaultValue={selectedMeetingType}
                containerStyle={{height: 40, width: '100%', marginBottom: 10, color: theme.PRIMARY_COLOR}}
                style={{
                  paddingHorizontal: 2,

                  backgroundColor: theme.PRIMARY_COLOR,
                  borderColor: theme.PRIMARY_COLOR,
                  borderRadius: 3
                }}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                dropDownStyle={{
                  color: theme.WHITE,
                  borderColor: theme.PRIMARY_COLOR,
                  backgroundColor: theme.PRIMARY_COLOR,
                }}
                onChangeItem={item => {
                  setSelectedMeetingType(item.value)
                }}
            />}
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
  },
  buttons: {
    width: '90%',
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    marginBottom: 10
  },
  content: {
    width: '80%',
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
    height: '100%',
    width: '100%',
    opacity: 1,
    borderRadius: 4
  },
  title: {
    marginTop: 30,
    marginBottom: 30,
  }
});
export default EditMeetingScene;
