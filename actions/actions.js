import {
  ADD_EMTPY_CATEGORY,
  ADD_ENTRY_TO_MEETING,
  ADD_TO_CIRCUMSTANTIAL_MUSIC,
  DELETE_SELECTED_CATEGORY, DUPLICATE_SELECTED_CATEGORY,
  PLAY_NEXT,
  PLAY_PREVIOUS,
  PLAY_SELECTED_VIDEO,
  REMOVE_MEETING_CARD,
  SAVE_CATEGORY,
  SET_FIELD_VALUE,
  SET_MEETING_DATA,
  TOGGLE,
  TOGGLE_OVERLAY,
  UPDATE_DURATION_FOR_VIDEO
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

const playNext = (data) => async dispatch => {
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

const removeMeetingCard = (data) => async dispatch => {
  dispatch({
    type: REMOVE_MEETING_CARD,
    payload: data
  })
}

const addEmptyCategory = () => async dispatch => {
  dispatch({
    type: ADD_EMTPY_CATEGORY,
  })
}
const saveCategory = (data) => async dispatch => {
  dispatch({
    type: SAVE_CATEGORY,
    payload: data
  })
}
const deleteSelectedCategory = () => async dispatch => {
  dispatch({
    type: DELETE_SELECTED_CATEGORY,
  })
}
const duplicateSelectedCategory = () => async dispatch => {
  dispatch({
    type: DUPLICATE_SELECTED_CATEGORY,
  })
}
const updateDurationForVideo = (data) => async dispatch => {
  dispatch({
    type: UPDATE_DURATION_FOR_VIDEO,
    payload:data
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
  playPrevious,
  removeMeetingCard,
  addEmptyCategory,
  saveCategory,
  deleteSelectedCategory,
  duplicateSelectedCategory,
  updateDurationForVideo,
}
