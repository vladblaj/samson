import {Animated, Image, StyleSheet, Text, TouchableOpacity} from "react-native";

import React from "react";
import {Col, Grid, Row} from "react-native-easy-grid";
import {Icon, Thumbnail, Title, View} from "native-base";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../actions/actions";
import {useRotateAnimation} from "./useRotateHook";

const MeetingCard = ({
  video,
  isActive,
  scale,
  selectedTrack,
  onClick,
  onLongClick
}) => {
  const dispatch = useDispatch();
  const editMeeting = useSelector(state => state.editMeeting)
  const theme = useSelector(state => state.theme)

  const [translation, rotation] = useRotateAnimation(editMeeting)
  const newCard = () => {
    return (<View style={styles.newCard}>
      <Image style={styles.newCardImage} source={require('../../img/round_add_circle_outline_black_18dp.png')}/>
    </View>)
  }
  const normalCard = () => {
    return <View>
      <Grid>
        <Col style={styles.meetingName}>
          <Title numberOfLines={4} style={[styles.meetingNameText,{color: theme.WHITE }]}>{video.meetingType}</Title>
        </Col>
        <Col style={{width: '25%'}}>
          <View style={styles.thumbnail}>
            <Thumbnail large round
                       source={{uri: video.thumbnail}}/>
          </View>
        </Col>
        <Col style={{width: '35%'}}>
          <Row>
            <View style={styles.mediaBody}>
              <Title numberOfLines={2} style={[styles.title,{color: theme.WHITE}]}>{video.title}</Title>
              <Text style={{color: theme.WHITE}}>{video.channel}</Text>
              <Text style={{color: theme.WHITE}}>{video.publishedAt}</Text>
            </View>
          </Row>
        </Col>
      </Grid>
    </View>
  }
  const getBackgroundColor = () => {
    return video && selectedTrack && video.key === selectedTrack.key ? theme.SELECTED
        : theme.NEUTRAL_COLOR
  }
  const removeMeetingCard = () => {
    dispatch(actions.removeMeetingCard({key: video.key}))
  }
  return (
      <TouchableOpacity style={[styles.rowItem, {backgroundColor: theme.PRIMARY_COLOR}]} onLongPress={onLongClick}
                        onPress={onClick}>
        <Animated.View
            style={{
              marginBottom: 4,
              flex: 1,
              paddingHorizontal: 10,
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: getBackgroundColor(),
              elevation: isActive ? 10 : 0,
              shadowRadius: isActive ? 10 : 0,
              shadowColor: isActive ? 'black' : 'transparent',
              shadowOpacity: isActive ? 0.25 : 0,
              transform: [{translateY: translation}, {rotate: rotation}],
              borderRadius: 4
            }}>

          {video.addNewCard ? newCard() : normalCard()}
          {editMeeting && <TouchableOpacity
              style={{alignSelf: 'flex-end', position: 'absolute', top: -2, right: -2}}>
            <Icon style={{color: 'rgb(47,52,55)'}} name={'remove-circle'}
                  onPress={removeMeetingCard}/></TouchableOpacity>}
        </Animated.View>

      </TouchableOpacity>
  );
};

export default MeetingCard;

const styles = StyleSheet.create({
  meetingName: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  meetingNameText: {
    fontSize: 16
  },
  rowItem: {
    height: 100,
    width: '100%',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 32,
    flex: 1,
    textAlign: 'center',
  },
  newCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  thumbnail: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newCardImage: {
    width: 40,
    height: 40
  }, mediaBody: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center'
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
  }
});