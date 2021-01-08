import React from 'react';
import {Body, Button, Card, CardItem, Container, Content, Header, Text, Title} from 'native-base';
import {decrement, increment} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const Counter = props => {

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
                {props.count}
              </Text>
            </CardItem>
          </Card>
          <Button dark bordered onPress={() => props.increment()}>
            <Text>Increment</Text>
          </Button>
          <Button dark bordered onPress={() => props.decrement()}>
            <Text>Decrement</Text>
          </Button>
        </Content>
      </Container>
  );
}

function mapStateToProps(state) {
  return {
    count: state.count
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({increment: increment, decrement: decrement}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Counter);