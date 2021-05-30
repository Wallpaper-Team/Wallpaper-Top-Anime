import {SET_DATA, SET_MORE} from '../actions/data';

const initialState = {
  posts: new Map(),
  images: new Map(),
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      state.posts.set(action.selected, action.posts);
      state.images.set(action.selected, action.images);
      return state;
    case SET_MORE:
      const posts = state.posts.get(action.selected);
      state.posts.set(action.selected, posts.concat(action.posts));
      const images = state.images.get(action.selected);
      state.images.set(action.selected, images.concat(action.images));
      return state;
    default:
      return state;
  }
};

export default dataReducer;
