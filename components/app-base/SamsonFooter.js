import { Footer, FooterTab} from "native-base";
import Player from "../player-controls/Player";
import React from "react";
import {StyleSheet} from "react-native";

const SamsonFooter = (props) => {
  return ( <Footer style={styles.footer}>
    <FooterTab>
      <Player ytFrameRef={props.ytFrameRef}/>
    </FooterTab>
  </Footer>)
}

const styles = StyleSheet.create({
  footer: {
    height: 150
  }
});

export default SamsonFooter;