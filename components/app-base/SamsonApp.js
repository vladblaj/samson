import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Root} from 'native-base';
import SamsonHeader from "./SamsonHeader";
import SamsonContent from "./SamsonContent";
import SamsonFooter from "./SamsonFooter";

export default function SamsonApp() {

  const ytFrameRef = useRef();
  return (
      <Root>
        <Container style={styles.container}>
          <SamsonHeader/>
          <SamsonContent ytFrameRef={ytFrameRef}/>
          <SamsonFooter ytFrameRef={ytFrameRef}/>
        </Container>
      </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
