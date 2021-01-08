
//Define your initialState
const initialState = {
  count: 0,
}
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      //return {...state, loading: action.payload};
      return {...state, count: state.count++};
    case DECREMENT:
      return {...state, count: state.count--};
    default:
      return state;
  }
}

export default reducer;