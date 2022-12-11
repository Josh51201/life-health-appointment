const initialState = {
  status: 'NOT_CONNECTED',
  user: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGGED_IN': return { ...state, status: 'CONNECTED', user: action.payload };
    default: return state;
  }
};

export default userReducer;
