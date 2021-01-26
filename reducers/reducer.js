//Define your initialState
export const initialState = {
  count: 0,
  tracks: [{
    title: 'E figuranta',
    artist: 'Florin Salam',
    albumArtUrl: "http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg",
    audioUrl: "https://www.youtube.com/watch?v=NHHT_K4bTTs&ab_channel=NekMusicTv",
  }]
}
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      //return {...state, loading: action.payload};
      return {...state, count: state.count + 1};
    case DECREMENT:
      return {...state, count: state.count - 1};
    default:
      return state;
  }
}

export default reducer;