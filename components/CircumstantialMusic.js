import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import CellElement from "./CellElement";
import {SamsonContext} from "../store/appStore";

const CircumstantialMusic = props => {
  const {store, actions} = useContext(SamsonContext);

  return (
      <View style={styles.container}>
        {[...Array(12).keys()].map(function(id){
          const title =  store.tracks && store.tracks[id]? store.tracks[id].snippet.title : '';
          return  <CellElement key = {id} id={id} value={title}/>;
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
    flex: 1
  },
  text: {margin: 6},
});

export default CircumstantialMusic

