import {SET_DATA, SET_MORE} from '../actions/data';

const initialState = {
  posts: new Map(),
  images: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      state.posts.set(action.selected, action.posts);
      console.log('Posts change', state);
      return {
        ...state,
      };
    case SET_MORE:
      console.log(state);
      return state;
    default:
      return state;
  }
};

export default dataReducer;
