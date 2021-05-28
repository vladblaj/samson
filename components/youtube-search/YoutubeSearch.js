import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Input, Item, View} from "native-base";
import VideoList from "./VideoList";
import {getYoutubeSearchResults} from '../../api/YoutubeApi'
import {debounce} from "lodash";
import {useSelector} from "react-redux";

const YoutubeSearch = props => {

  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const onChangeSearchTerm = useCallback(debounce((value)=>value? searchOnYoutube(value) : null, 2000), []);
  const theme = useSelector(state => state.theme)

  const searchOnYoutube = async (term) => {
    const results = await getYoutubeSearchResults(term)
    setVideos(results.data.items);
  }
  const onVideoSelect = (video) =>{
    props.onVideoSelect(video);
  }
  return (
      <View style={[styles.container,{backgroundColor: theme.SECONDARY_COLOR}]}>
        <Item>
          <Input style={[styles.searchInput,{borderColor: theme.PRIMARY_COLOR, backgroundColor: theme.PRIMARY_COLOR, color:theme.WHITE}]} placeholderTextColor={theme.WHITE} placeholder="Search" returnKeyType="search"
                 value={searchTerm}
                 onChangeText={onChangeSearchTerm}/>
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
    borderRadius: 3,
  },
  videoList:{
    height: 450,
    marginTop: 10,
  },
  container: {
    opacity: 1,
    width: '100%',
  },
});
export default YoutubeSearch;
