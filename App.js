import {StatusBar} from 'expo-status-bar';
import React, {useContext, useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
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
          <Header>
            <Left>
              <Button transparent>
                <Icon name='menu'/>
              </Button>
            </Left>
            <Body>
              <Title>Samson</Title>
            </Body>
            <Right/>
          </Header>
          <Content scrollEnabled={false} >
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
  container: {
    flex: 1,
  }
});
