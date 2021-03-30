import React  from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Body, Button, Header, Icon, Left, Right, Title} from "native-base";
import actions from "../../actions/actions";
import {useDispatch} from "react-redux";
import {Actions} from "react-native-router-flux";
import {THEME} from "../../color-theme";
const SamsonHeader = () => {
  const dispatch = useDispatch()
  return (
      <Header style={styles.header}>
        <Left>
          <Button transparent>
            <Icon style={{color: THEME.FILLER_COLOR }} name='menu'/>
          </Button>
        </Left>
        <Body>
          <Title style={{color: THEME.FILLER_COLOR}}>Samson</Title>
        </Body>
        <Right>
          <TouchableOpacity style={styles.maximize} onPress={() => {
            Actions.pop();
            dispatch(actions.setFieldValue({name: 'isYoutubeVisible', value: true}));
          }}>
            <Image source={require('../../img/baseline_ondemand_video_black_18dp.png')}
                   style={styles.maximizeImage}/>
          </TouchableOpacity>
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
    backgroundColor:  THEME.FILLER_COLOR,
  }
});

export default SamsonHeader;
