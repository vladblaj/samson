import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Body, Button, Header, Icon, Left, Right, Text, Title, View} from "native-base";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../actions/actions";
import {Actions} from "react-native-router-flux";

const SamsonHeader = () => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const dispatch = useDispatch();
  const editMeeting = useSelector(state => state.editMeeting);
  const theme = useSelector(state => state.theme);
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
        <Icon name={'logo-youtube'} style={{color: theme.FILLER_COLOR}}/>
      </TouchableOpacity></View>)
  }

  return (
      <Header style={{backgroundColor: theme.PRIMARY_COLOR}}>
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
            <Icon style={{color: theme.FILLER_COLOR}} name='menu' />
          </Button>
        </Left>
        <Body>
          <Title style={{color: theme.WHITE}}>Samson</Title>
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
  maximize: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 28, height: 28,
    borderRadius: 3
  }
});

export default SamsonHeader;
