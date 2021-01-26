//Define your initialState
import {SET_FIELD_VALUE, TOGGLE} from "./actionConstants";

export const initialState = {
  count: 0,
  paused: false,
  selectedTrack: '2-aWEYezEMk',
  repeatOn: false,
  shuffleOn: false,

  tracks: [{
    title: 'E figuranta',
    artist: 'Florin Salam',
    albumArtUrl: "http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg",
    audioUrl: "https://www.youtube.com/watch?v=NHHT_K4bTTs&ab_channel=NekMusicTv",
  }]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELD_VALUE:
      return {...state, [action.payload.name]: action.payload.value};
    case TOGGLE:
      return {...state, [action.payload.name]: !state[action.payload.name]};
    default:
      return state;
  }
}

export default reducer;