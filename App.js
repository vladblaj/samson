import {StatusBar} from 'expo-status-bar';
import React from 'react';
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
  Text,
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
              <Title>Aplicatia delir</Title>
            </Body>
            <Right/>
          </Header>
          <Content>

            <View>
              <Text>Sa ma beau</Text>
              <View style={styles.upperModule}>
                <CircumstantialMusic/>
              </View>
              <Player/>
              <View style={styles.lowerModule}>
              </View>
              <StatusBar style="auto"/>
            </View>
          </Content>
          <Footer style={styles.footer}>
            <FooterTab>

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
    height: '18%',
  },
  container: {
    flex: 1,
  }
});
