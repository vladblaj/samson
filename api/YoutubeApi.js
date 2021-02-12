import axios from "axios";
import {mockYoutubeList} from "./mockYoutuneListResponse";

const API_KEY = 'AIzaSyAOtHbbbQ_DG9gzosdD60mo8OUrXQWcgEc'
const headers = {'Accept':'application/json'}
//GET https://youtube.googleapis.com/youtube/v3/search?part=bla%20bla&key=[YOUR_API_KEY] HTTP/1.1

//    Authorization: Bearer [YOUR_ACCESS_TOKEN]
//Accept: application/json

const baseURL = 'https://youtube.googleapis.com/youtube';
const version = '/v3';
const search_youtube = '/search'

const requestTypes = {
  GET: 'GET',
  DELETE: 'DELETE',
  POST: 'POST',
  PUT: 'PUT',
};

//https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.search.list?
 //   part=snippet
 //   &q=GoogleDevelopers

export const getYoutubeSearchResults = async (searchString) => {
  const encodedSearchString = encodeURI(searchString);
  console.log(`URL IS: ${baseURL}${version}${search_youtube}?type=video&part=snippet&q=${encodedSearchString}&key=${API_KEY}`)
  console.log(`MOck Data is: ${mockYoutubeList}`)
  //const res = await axios.get(`${baseURL}${version}${search_youtube}?type=video&part=snippet&q=${encodedSearchString}&key=${API_KEY}`,{headers});
  //return res;
  return mockYoutubeList
}