//Define your initialState
import {
  ADD_TO_CIRCUMSTANTIAL_MUSIC,
  PLAY_SELECTED_CIRCUMSTANTIAL_VIDEO,
  SET_FIELD_VALUE, SET_PLAYER_REF,
  SET_SELECTED_CIRCUMSTANTIAL_CELL,
  TOGGLE
} from "./actionConstants";

export const initialState = {
  searchOverlay: false,
  count: 0,
  paused: true,
  duration: 0,
  selectedTrack: '2-aWEYezEMk',
  repeatOn: false,
  shuffleOn: false,
  selectedCircumstantialCell: 0,
  tracks: {},
  playerRef: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELD_VALUE:
      return {...state, [action.payload.name]: action.payload.value};
    case TOGGLE:
      return {...state, [action.payload.name]: !state[action.payload.name]};
    case ADD_TO_CIRCUMSTANTIAL_MUSIC:
      return {...state, tracks: {...state.tracks, [state.selectedCircumstantialCell]: action.payload}};
    case SET_SELECTED_CIRCUMSTANTIAL_CELL:
      return {...state, selectedCircumstantialCell: action.payload.id};
    case PLAY_SELECTED_CIRCUMSTANTIAL_VIDEO: {
      if (state.tracks[state.selectedCircumstantialCell]) {
        return {...state, selectedTrack: state.tracks[state.selectedCircumstantialCell].id.videoId, paused: false};
      }
      return state;
    }
    case 'VLAD': {
      return {...state, playerRef: action.payload};
    }
    default:
      return state;
  }
}

export default reducer;