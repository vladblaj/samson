import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet,SafeAreaView} from 'react-native';
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

export default function App() {
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
          <Content>
            <View>
              <View style={styles.upperModule}>
                <CircumstantialMusic/>
              </View>
              <View style={styles.lowerModule}>
              </View>
              <StatusBar style="auto"/>
            </View>
          </Content>
          <Footer style={styles.footer}>
            <FooterTab>
              <Player/>
            </FooterTab>
          </Footer>
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
    height: 230
  },
  container: {
    flex: 1,
  }
});
