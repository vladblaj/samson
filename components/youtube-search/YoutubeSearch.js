import React from 'react';
import {useState} from "reinspect";
import {Image, ScrollView, StyleSheet} from 'react-native';
import {Input, Item, View} from "native-base";
import VideoList from "./VideoList";
import {getYoutubeSearchResults} from '../../api/YoutubeApi'
import {useDispatch} from "react-redux";
import actions from "../../actions/actions";
const API_KEY = 'AIzaSyCvchGhGdg1zZYciEFkRrWcKpCZ3CSdTZs';

const YoutubeSearch = props => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null, 1);
  const dispatch = useDispatch();
  const searchOnYoutube = async (term) => {
    const results = await getYoutubeSearchResults(term)
    setVideos(results.data.items);
  }

  const addToCircumstantialMusic = (vid) => {
    dispatch(actions.addToCircumstantialMusic(vid));
    dispatch(actions.toggle({name: 'searchOverlay'}))
  }
  return (
      <View style={styles.container}>
        <Item>
          <Input style={styles.searchInput} placeholder="Search" returnKeyType="search"
                 value={searchTerm}
                 onChangeText={searchOnYoutube}/>
        </Item>

        <ScrollView style={[styles.videoList]}>
        <VideoList
            onVideoSelect={addToCircumstantialMusic}
            videos={videos}/>
        </ScrollView>
      </View>
  );
}
const styles = StyleSheet.create({
  text: {margin: 6},
  searchInput: {
    height: 40,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  videoList:{
    height: 360
  },
  searchInputIcon: {
    borderRadius: 4,
    backgroundColor: 'white',

  },
  container: {
    opacity: 1,
    width: '80%',
    backgroundColor: 'rgb(25,25,25)'

  },
});
export default YoutubeSearch;
