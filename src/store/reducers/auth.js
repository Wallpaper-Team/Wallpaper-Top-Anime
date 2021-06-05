import {AUTHENTICATE, LOGOUT, UPDATE} from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  userName: null,
  userEmail: null,
  userPhone: null,
  userPhoto: null,
  isAnonymous: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        userName: action.userName,
        userPhone: action.userPhone,
        userEmail: action.userEmail,
        userPhoto: action.userPhoto,
        isAnonymous: action.isAnonymous,
      };
    case UPDATE: {
      return {
        ...state,
        userPhoto: action.userPhoto,
      };
    }
    case LOGOUT:
      alert('Logged out, continue as anonymous');
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
