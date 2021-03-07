import {StatusBar} from 'expo-status-bar';
import React, {useRef} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import actions from './actions/actions'
import YoutubeMovable from './components/youtube-search/YoutubeMovable'
import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Icon,
  Left,
  Right,
  Root,
  Title,
  View
} from 'native-base';
import Overlay from "./components/Overlay";
import {useDispatch, useSelector} from "react-redux";
import CircumstantialMusic from "./components/CircumstantialMusic";
import Player from "./components/Player";
import Meeting from "./components/meeting/Meeting";

export default function App() {
  const store = useSelector(state => state)
  const dispatch = useDispatch()
  const ytFrameRef = useRef();
  return (
      <Root>
        <Container style={styles.container}>
          <Header style={styles.header}>
            <Left>
              <Button transparent>
                <Icon name='menu'/>
              </Button>
            </Left>
            <Body>
              <Title style={{color: 'white'}}>Samson</Title>

            </Body>
            <Right>
              <TouchableOpacity style={styles.maximize} onPress={() => {
                dispatch(actions.setFieldValue({name: 'isYoutubeVisible', value: true}));
              }}>
                <Image source={require('../samson/img/baseline_ondemand_video_black_18dp.png')}
                       style={styles.maximizeImage}/>
              </TouchableOpacity>
            </Right>
          </Header>

          <Content scrollEnabled={false} style={styles.content}>

            <View style={styles.upperModule}>
              <YoutubeMovable ytFrameRef={ytFrameRef}/>
              <CircumstantialMusic/>
              <Meeting id={1} data={store.meetings[1] ? store.meetings[1] : []}/>

            </View>
            <StatusBar style="auto"/>
          </Content>
          <Footer style={styles.footer}>
            <FooterTab>
              <Player ytFrameRef={ytFrameRef}/>
            </FooterTab>
          </Footer>
          {
            store.searchOverlay && <Overlay/>
          }

        </Container>

      </Root>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'rgb(4,4,4)',
  },
  upperModule: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0
  },
  lowerModule: {
    flexGrow: 3,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: '#14e930'
  },
  footer: {
    height: 150
  },
  header: {
    backgroundColor: 'rgb(4,4,4)',
  },
  container: {
    flex: 1,
  },
  maximize: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 28, height: 28,
    backgroundColor: 'rgb(25,118,209)',
    borderRadius: 3
  },
  ytFrame: {
    zIndex: 10,
    position: 'absolute'
  },
  maximizeImage: {
    right: 0,
    borderRadius: 3,
    width: 25, height: 25,
    backgroundColor: 'rgb(25,118,209)',
  }
});
