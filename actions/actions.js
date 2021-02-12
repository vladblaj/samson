import {
  ADD_TO_CIRCUMSTANTIAL_MUSIC,
  PLAY_SELECTED_CIRCUMSTANTIAL_VIDEO,
  SET_FIELD_VALUE, SET_PLAYER_REF,
  SET_SELECTED_CIRCUMSTANTIAL_CELL,
  TOGGLE
} from "../reducers/actionConstants";

export const useActions = (state, dispatch) => ({
      toggle: data => {
        dispatch({
          type: TOGGLE,
          payload: data
        })
      },
  toggle2: data => {
    dispatch({
      type: TOGGLE,
      payload: data
    })
  },
      setFieldValue: data => {
        dispatch({
          type: SET_FIELD_VALUE,
          payload: data
        })
      },
      addToCircumstantialMusic: data => {
        dispatch({
          type: ADD_TO_CIRCUMSTANTIAL_MUSIC,
          payload: data
        })
      },
      setSelectedCircumstantialCell: data => {
        dispatch({
          type: SET_SELECTED_CIRCUMSTANTIAL_CELL,
          payload: data
        })
      },
      playSelectedCircumstantialVideo: data => {
        dispatch({
          type: PLAY_SELECTED_CIRCUMSTANTIAL_VIDEO,
        })
      },
      toVlad: data => {
        dispatch({
          type: 'VLAD',
          payload: data
        })
      }
    })
;