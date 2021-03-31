import {
  ADD_ENTRY_TO_MEETING,
  ADD_TO_CIRCUMSTANTIAL_MUSIC, PLAY_NEXT, PLAY_PREVIOUS,
  PLAY_SELECTED_VIDEO,
  SET_FIELD_VALUE,
  SET_MEETING_DATA,
  TOGGLE,
  TOGGLE_OVERLAY
} from "../reducers/actionConstants";

const toggle = data => async dispatch => {
  dispatch({
    type: TOGGLE,
    payload: data
  })
}
const setFieldValue = data => async dispatch => {
  dispatch({
    type: SET_FIELD_VALUE,
    payload: data
  })
}
const addToCircumstantialMusic = (data) => async dispatch => {
  dispatch({
    type: ADD_TO_CIRCUMSTANTIAL_MUSIC,
    payload: data
  })
}
const playSelectedVideo = (data) => async dispatch => {
  dispatch({
    type: PLAY_SELECTED_VIDEO,
    payload: data
  })
}

const setMeetingData = (data) => async dispatch => {
  dispatch({
    type: SET_MEETING_DATA,
    payload: data
  })
}

const toggleOverlay = (data) => async dispatch => {
  dispatch({
    type: TOGGLE_OVERLAY,
    payload: data
  })
}

const addEntryToMeeting = (data) => async dispatch => {
  dispatch({
    type: ADD_ENTRY_TO_MEETING,
    payload: data
  })
}

const playNext = (data)  => async dispatch => {
  dispatch({
    type: PLAY_NEXT,
    payload: data
  })
}

const playPrevious = (data) => async dispatch => {
  dispatch({
    type: PLAY_PREVIOUS,
    payload: data
  })
}

export default {
  toggleOverlay,
  toggle,
  setFieldValue,
  addToCircumstantialMusic,
  playSelectedVideo,
  setMeetingData,
  addEntryToMeeting,
  playNext,
  playPrevious
}
