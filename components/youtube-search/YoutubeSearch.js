import React , {useState} from 'react';
import { ScrollView, StyleSheet} from 'react-native';
import {Input, Item, View} from "native-base";
import VideoList from "./VideoList";
import {getYoutubeSearchResults} from '../../api/YoutubeApi'
import {THEME} from "../../color-theme";

const YoutubeSearch = props => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const searchOnYoutube = async (term) => {
    const results = await getYoutubeSearchResults(term)
    setVideos(results.data.items);
  }
  const onVideoSelect = (video) =>{
    props.onVideoSelect(video);
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
            onVideoSelect={onVideoSelect}
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
    backgroundColor: THEME.FILLER_COLOR,
  },
  videoList:{
    height: 400
  },
  container: {
    opacity: 1,
    width: '80%',
    backgroundColor: THEME.SECONDARY_COLOR

  },
});
export default YoutubeSearch;
