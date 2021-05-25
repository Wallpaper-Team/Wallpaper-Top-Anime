import {SET_FILES} from '../actions/tempFiles';

const initialState = {
  files: null,
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILES:
      return {
        files: action.files,
      };
    default:
      return initialState;
  }
};

export default fileReducer;
