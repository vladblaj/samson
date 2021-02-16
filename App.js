import {StatusBar} from 'expo-status-bar';
import React, {useContext, useRef} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import CircumstantialMusic from "./components/CircumstantialMusic";
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
import Player from "./components/Player";
import Overlay from "./components/Overlay";
import {SamsonContext} from "./store/appStore";
import YoutubeMovable from "./components/youtube-search/YoutubeMovable";

export default function App() {
  const {store, actions} = useContext(SamsonContext);
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
                actions.setFieldValue({name: 'isYoutubeVisible', value: true});
              }}>
                <Image source={require('../samson/img/baseline_ondemand_video_black_18dp.png')} style={styles.minimizeImage}/>
              </TouchableOpacity>
            </Right>
          </Header>
          <Content scrollEnabled={false} style={styles.content}>
            <View>
              <View style={styles.upperModule}>
                <CircumstantialMusic/>
                <YoutubeMovable ytFrameRef={ytFrameRef}/>
              </View>
              <View style={styles.lowerModule}>
              </View>
              <StatusBar style="auto"/>
            </View>
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
    width: 40, height: 40,
    backgroundColor: 'rgb(25,118,209)',
    borderRadius: 3
  }
});
