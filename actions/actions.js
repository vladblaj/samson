import {DECREMENT, INCREMENT} from "../reducers/reducer";

export const useActions = (state, dispatch) => ({
  increment: data =>
      dispatch({
        type: INCREMENT,
        payload: data}),

  decrement: data =>
      dispatch({
        type: DECREMENT,
        payload: data,
      }),
});