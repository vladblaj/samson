import {SET_FIELD_VALUE, TOGGLE} from "../reducers/actionConstants";

export const useActions = (state, dispatch) => ({
  toggle: data =>{
    dispatch({
      type: TOGGLE,
      payload: data})
  },
  setFieldValue: data =>{
    dispatch({
      type: SET_FIELD_VALUE,
      payload: data})
  }
});