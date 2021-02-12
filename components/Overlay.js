import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity,TouchableHighlight, View} from 'react-native';
import {SamsonContext} from "../store/appStore";
import YoutubeSearch from "./youtube-search/YoutubeSearch";

const Overlay = props => {
  const {actions} = useContext(SamsonContext);

  const toggleOverlay = () => {
    actions.toggle({name: 'searchOverlay'})
  };
  return (
      <TouchableOpacity
          onPress={toggleOverlay} style={styles.container} >
        <TouchableHighlight style={styles.overlay}>
          <YoutubeSearch/>
        </TouchableHighlight>
      </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  text: {margin: 6},
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor:'rgba(0, 0, 0, 0.6)'
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: '15%',
    marginRight: '15%',
    marginTop: '20%',
    marginBottom: '20%',
    opacity: 1
  }
});
export default Overlay;
