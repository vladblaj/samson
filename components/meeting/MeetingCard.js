import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";
import Animated from "react-native-reanimated";
import React from "react";
import {Col, Grid, Row} from "react-native-easy-grid";
import {Thumbnail, Title, View} from "native-base";
import actions from "../../actions/actions";
import {useDispatch} from "react-redux";

const MeetingCard = ({
  item,
  drag,
  isActive,
  scale,
}) => {
  const dispatch = useDispatch()

  const newCard = () => {
    return (<View style={styles.newCard}>
      <Image style={styles.newCardImage} source={require('../../img/round_add_circle_outline_black_18dp.png')}/>
    </View>)
  }
  const normalCard = () => {
    return <View>
      <Grid>
        <Col style={styles.meetingName}>
          <Title numberOfLines={4} style={styles.meetingNameText}>Meeting Name</Title>
        </Col>
        <Col style={{width: '25%'}}>
          <View style={styles.thumbnail}>
            <Thumbnail large round
                       source={{uri: 'https://i.ytimg.com/vi/r-AH9oMD-Es/hqdefault.jpg'}}/>
          </View>
        </Col>
        <Col style={{width: '35%'}}>
          <Row>
            <View style={styles.mediaBody}>
              <Title numberOfLines={2} style={styles.title}>Video Titlu eu merg la culcare te pup</Title>
              <Text style={styles.textDetails}>Channel Title</Text>
              <Text style={styles.textDetails}>February 05 2020</Text>
            </View>
          </Row>
        </Col>
      </Grid>
    </View>
  }
  const addNewCard = () => {
    dispatch(actions.toggleOverlay({clickedFrom: 'MEETING'}));
  }
  return (
      <TouchableOpacity style={styles.rowItem} onLongPress={!item.addNewCard ? drag : null}
                        onPress={item.addNewCard ? addNewCard : null}>
        <Animated.View
            style={{
              marginBottom:4,
              flex: 1,
              paddingHorizontal: 10,
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: item.backgroundColor,
              elevation: isActive ? 10 : 0,
              shadowRadius: isActive ? 10 : 0,
              shadowColor: isActive ? 'black' : 'transparent',
              shadowOpacity: isActive ? 0.25 : 0,
              transform: [{scaleX: scale}, {scaleY: scale}],
              borderRadius: 4
            }}>
          {item.addNewCard ? newCard() : normalCard()}
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
    color: 'white',
    fontSize: 16
  },
  rowItem: {
    backgroundColor: 'rgb(4,4,4)',
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
  },

  title: {
    color: 'rgb(255,255,255)',
  },
  textDetails: {
    color: 'rgb(170,170,170)',

  },
});