import React, {useContext} from 'react';
import {Body, Button, Card, CardItem, Container, Content, Header, Text, Title} from 'native-base';
import {SamsonContext} from '../store/appStore';

const Counter = props => {
  const {store, actions} = useContext(SamsonContext);

  const getStoreCount = () => {
    console.log(store.count);
    return store.count;
  }

  return (
      <Container>
        <Header>
          <Body>
            <Title>Redux Counter</Title>
          </Body>
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Text>
                {getStoreCount()}
              </Text>
            </CardItem>
          </Card>
          <Button dark bordered onPress={() => actions.increment()}>
            <Text>Increment</Text>
          </Button>
          <Button dark bordered onPress={() => actions.decrement()}>
            <Text>Decrement</Text>
          </Button>
        </Content>
      </Container>
  );
}

export default Counter;