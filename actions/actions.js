import {
  ADD_TO_CIRCUMSTANTIAL_MUSIC,
  PLAY_SELECTED_CIRCUMSTANTIAL_VIDEO,
  SET_FIELD_VALUE,
  SET_MEETING_DATA,
  SET_SELECTED_CIRCUMSTANTIAL_CELL,
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
const setSelectedCircumstantialCell = (data) => async dispatch => {
  dispatch({
    type: SET_SELECTED_CIRCUMSTANTIAL_CELL,
    payload: data
  })
}
const playSelectedCircumstantialVideo = (data) => async dispatch => {
  dispatch({
    type: PLAY_SELECTED_CIRCUMSTANTIAL_VIDEO,
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

export default {
  toggleOverlay,
  toggle,
  setFieldValue,
  addToCircumstantialMusic,
  setSelectedCircumstantialCell,
  playSelectedCircumstantialVideo,
  setMeetingData,
}
