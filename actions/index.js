import {INCREMENT, DECREMENT} from "../reducers/reducer";
export const increment = (data) => {
  //Return a action type and a loading to false, and the data.
  return {
    type: INCREMENT,
    payload: data,
    loading: false,
  };
}

export const decrement = (data) => {
  //Return a action type and a loading to false, and the data.
  return {
    type: DECREMENT,
    payload: data,
    loading: false,
  };
}
