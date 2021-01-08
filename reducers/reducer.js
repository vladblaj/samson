//Define your initialState
export const initialState = {
  count: 0,
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