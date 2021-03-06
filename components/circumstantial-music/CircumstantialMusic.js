import React from 'react';
import {StyleSheet, View} from 'react-native';
import CellElement from "./CellElement";
import {useSelector} from "react-redux";

const CircumstantialMusic = () => {
  const store = useSelector(state => state)

  return (
      <View style={styles.container}>
        {[...Array(12).keys()].map(function (id) {
          const existingTrack = store.tracks && store.tracks.find? store.tracks.find(t => t.key===id): null;
          return <CellElement key={id} id={id} video={existingTrack} selectedTrack={store.selectedTrack}/>;
        })}
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    zIndex: 10
  },
  text: {margin: 6},
});

export default CircumstantialMusic

