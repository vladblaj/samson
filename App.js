import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import CircumstantialMusic from "./components/CircumstantialMusic";
import {Root, Body, Button, Container, Content, Footer, FooterTab, Header, Icon, Left, Right, Text, Title} from 'native-base';
import Counter from "./components/Counter";

export default function App() {

  return (
      <Root>
        <Container>
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
            <View style={styles.container}>
              <Counter/>
              <Text>Sa ma beau</Text>
              <View style={styles.upperModule}>
                <CircumstantialMusic/>
              </View>
              <View style={styles.lowerModule}>
                <Text>Partea di gios</Text>
              </View>
              <StatusBar style="auto"/>
            </View>
          </Content>
          <Footer>
            <FooterTab>
              <Button full>
                <Text>Footer</Text>
              </Button>
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
  container: {
    flex: 1,
  }
});
