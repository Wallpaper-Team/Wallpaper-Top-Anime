import {INSERT_HEAD, SET_DATA, SET_MORE} from '../actions/data';

const initialState = {
  posts: [],
  images: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        posts: action.posts,
        images: action.images,
      };
    case SET_MORE:
      return {
        posts: state.posts.concat(action.posts),
        images: state.images.concat(action.images),
      };
    case INSERT_HEAD:
      return {
        ...state,
        images: action.post.images.concat(state.images),
      };
    default:
      return state;
  }
};

export default dataReducer;
