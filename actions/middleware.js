const createDebugSession = async (payload, dispatch) => {
  /**const sessionId = await createDebugSessionApi(payload);
   dispatch({ type: CREATE_DEBUG_SESSION_SUCCESS, payload: sessionId });
   const query = {
    handler: 'WebDebug',
    processID: payload.processId,
    branchId: payload.branchId,
    DebugSessionID: sessionId,
  };
   const data = { query, sessionId };
   return handleDebugSession(data, dispatch);*/
};

const apiCalls = async (dispatch, action) => {
  switch (action.type) {
    case 'test': {
      return createDebugSession(action.payload, dispatch);
    }
    default:
      return null
  }

};

export const applyMiddleware = dispatch => action =>
    dispatch(action) || apiCalls(dispatch, action);
