import {
  ADD_TO_CIRCUMSTANTIAL_MUSIC,
  PLAY_SELECTED_CIRCUMSTANTIAL_VIDEO,
  SET_FIELD_VALUE,
  SET_SELECTED_CIRCUMSTANTIAL_CELL,
  TOGGLE
} from "../reducers/actionConstants";

const toggle = data => async dispatch => {
  dispatch({
    type: TOGGLE,
    payload: data
  })
}
const toggle2 = data => async dispatch => {
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
const toVlad = data => {
  dispatch({
    type: 'VLAD',
    payload: data
  })
}
export default {
  toggle,
  toggle2,
  setFieldValue,
  addToCircumstantialMusic,
  setSelectedCircumstantialCell,
  playSelectedCircumstantialVideo,
  toVlad
}
