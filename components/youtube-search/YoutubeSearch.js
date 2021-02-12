import React, {useContext} from 'react';
import {useState } from "reinspect";
import {StyleSheet} from 'react-native';
import {SamsonContext} from "../../store/appStore";
import {Icon, Input, Item, View} from "native-base";
import VideoList from "./VideoList";
import {getYoutubeSearchResults} from '../../api/YoutubeApi'

const API_KEY = 'AIzaSyCvchGhGdg1zZYciEFkRrWcKpCZ3CSdTZs';

const YoutubeSearch = props => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null,1);
  const {actions} = useContext(SamsonContext);

  const searchOnYoutube = async (term) => {
    const results = await getYoutubeSearchResults(term)
    setVideos(results.data.items);
  }

  const addToCircumstantialMusic = (vid) =>{
    actions.addToCircumstantialMusic(vid);
    actions.toggle({name: 'searchOverlay'})
  }
  return (
      <View style={styles.container}>
        <Item>
          <Input style={styles.searchInput} placeholder="Search" returnKeyType="search"
                 value={searchTerm}
                 onChangeText={searchOnYoutube}/>
          <Icon name="ios-search" style={styles.searchInput}/>
        </Item>
        <VideoList
            onVideoSelect={addToCircumstantialMusic}
            videos={videos}/>
      </View>
  );
}
const styles = StyleSheet.create({
  text: {margin: 6},
  searchInput: {
    color: 'rgb(255,255,255)'
  },
  container: {
    opacity: 1,
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'rgb(25,25,25)'

  },
});
export default YoutubeSearch;
