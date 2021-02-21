import React from 'react';
import {StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';
import YoutubeSearch from "./youtube-search/YoutubeSearch";
import {useDispatch} from "react-redux";
import actions from "../actions/actions";
const Overlay = () => {
  const dispatch = useDispatch();

  const toggleOverlay = () => {
    dispatch(actions.toggle({name: 'searchOverlay'}))
  };
  return (
      <TouchableOpacity
          onPress={toggleOverlay} style={styles.container}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
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
