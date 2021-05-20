import React from 'react';
import { StyleSheet, View} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Animated from 'react-native-reanimated';
import MeetingCard from "./MeetingCard";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../actions/actions";
import {THEME} from "../../color-theme";
import {Actions} from "react-native-router-flux";

const Meeting = (props) => {
  const {
    Value,
  } = Animated;
  const id = useSelector(state => state.selectedMeeting)
  const theme = useSelector(state => state.theme)
  const data = useSelector(state => state.meetings[id])
  const selectedTrack = useSelector(state => state.selectedTrack)
  const editMeeting = useSelector(state => state.editMeeting)
  const dispatch = useDispatch();
  const array_move = (old_index, new_index) => {
    const dataClone = JSON.parse(JSON.stringify(data));
    if (old_index === data.length - 1 || new_index === data.length - 1) {
      return dataClone
    }
    if (new_index >= dataClone.length) {
      let k = new_index - dataClone.length + 1;
      while (k--) {
        dataClone.push(undefined);
      }
    }
    dataClone.splice(new_index, 0, dataClone.splice(old_index, 1)[0]);
    dispatch(actions.setMeetingData({id: id, value: dataClone}));
    return dataClone; // for testing
  };

  const addMeetingCard = (item) => {
    const {video, meetingType} = item;
    dispatch(actions.addEntryToMeeting({id, entry: {...video, meetingType}}));
    Actions.pop();
  }

  const toggleMeetingEdit = () => {
    dispatch(actions.setFieldValue({name: 'editMeeting', value: true}));
  }

  const onClickAddNewCard = () => {
    Actions.youtubeSearchOverlay({onItemSelected: addMeetingCard, meetingTypeVisible: true});
  }

  //const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const onClickPlaySelectedVideo = (video) => {
    return () => dispatch(actions.playSelectedVideo({video: video, playingIn: 'MEETING'}))
  }

  const editMeetingCard = (item) => {
    const {video, meetingType} = item;
    dispatch(actions.addEntryToMeeting({id, entry: {...video, meetingType}}));
    Actions.pop();
  }

  const onClickMeetingCard = (video) => {
    if (video.addNewCard) {
      return onClickAddNewCard;
    }
    if (editMeeting) {
      return () => Actions.youtubeSearchOverlay(
          {onItemSelected: editMeetingCard, meetingTypeVisible: true, data: video});
    }
    return onClickPlaySelectedVideo(video);
  }

  const onLongClickMeetingCard = (video, drag) => {
    return editMeeting ? drag : toggleMeetingEdit;
  }

  const renderItem = ({item, drag, isActive}) => {
    return (
        <MeetingCard
            toggleEdit={toggleMeetingEdit}
            selectedTrack={selectedTrack}
            video={item}
            drag={drag}
            isActive={isActive}
            addMeeting={addMeetingCard}
            scale={isActive ? animState.position : 1}
            onClick={onClickMeetingCard(item)}
            onLongClick={onLongClickMeetingCard(item, drag)}
        />
    );
  };

  const isActive = new Animated.Value(0);
  const animState = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(1),
    time: new Value(0),
  };

  return (
      <View style={[styles.container,{backgroundColor: theme.PRIMARY_COLOR}]}>
        <DraggableFlatList
            data={data}
            renderItem={renderItem}
            onDragBegin={(rowNumber) => {
              rowNumber === data.length - 1 ? isActive.setValue(0) : isActive.setValue(1)
            }}
            onRelease={(item) => isActive.setValue(0)}
            keyExtractor={(item, index) => `draggable-item-${item.key}`}
            onDragEnd={(swapItem) => {
              array_move(swapItem.from, swapItem.to)
            }}
        />
      </View>
  );
}

export default Meeting;

const styles = StyleSheet.create({
  container: {
    height: 480,
    margin: 5,
    flex: 1,
  },
  rowItem: {
    height: 100,
    width: '100%',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 32,
    flex: 1,
    textAlign: 'center',
  },
});