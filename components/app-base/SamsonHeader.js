import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Body, Button, Header, Icon, Left, Right, Text, Title, View} from "native-base";
import {useDispatch, useSelector} from "react-redux";
import {THEME} from "../../color-theme";
import actions from "../../actions/actions";
import {Actions} from "react-native-router-flux";

const SamsonHeader = () => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const dispatch = useDispatch();
  const editMeeting = useSelector(state => state.editMeeting);
  const displayEditMeetingControls = () => {
    return (<View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
      <Button small success onPress={() => {
        dispatch(actions.setFieldValue({name: 'editMeeting', value: false}));
      }}>
        <Text>Save</Text>
      </Button></View>);
  }
  const displayYoutubeIcon = () => {
    return (<View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
      <TouchableOpacity onPress={() => {
        dispatch(actions.setFieldValue({name: 'isYoutubeVisible', value: true}));
      }}>
        <Icon name={'logo-youtube'} style={{color: THEME.FILLER_COLOR}}/>
      </TouchableOpacity></View>)
  }

  return (
      <Header style={styles.header}>
        <Left>
          <Button transparent onPress={() => {
            if (isDrawerOpened) {
              Actions.drawerClose()
            }
            if (!isDrawerOpened) {
              Actions.drawerOpen()
            }
            setIsDrawerOpened(!isDrawerOpened);
          }}>
            <Icon style={{color: THEME.FILLER_COLOR}} name='menu' />
          </Button>
        </Left>
        <Body>
          <Title style={{color: THEME.FILLER_COLOR}}>Samson</Title>
        </Body>
        <Right>
          {editMeeting ? displayEditMeetingControls() : displayYoutubeIcon()}
        </Right>
      </Header>
  );
}

const styles = StyleSheet.create({
  lowerModule: {
    flexGrow: 3,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    backgroundColor: THEME.PRIMARY_COLOR,
  },
  maximize: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 28, height: 28,
    borderRadius: 3
  },
  maximizeImage: {
    right: 0,
    borderRadius: 3,
    width: 30, height: 25,
    backgroundColor: THEME.FILLER_COLOR,
  }
});

export default SamsonHeader;
