import {SET_DATA, SET_MORE} from '../actions/data';

const initialState = {
  posts: new Map(),
  lastPostTime: new Map(),
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      state.posts.set(action.selected, action.posts);
      state.lastPostTime.set(action.selected, action.lastPostTime);
      return state;
    case SET_MORE:
      const posts = state.posts.get(action.selected);
      action.posts.map((post) => {
        const filterList = posts.filter((p) => p.key == post.key);
        if (!filterList.length) {
          posts.push(post);
        }
      });
      state.posts.set(action.selected, [...posts]);
      state.lastPostTime.set(action.selected, action.lastPostTime);
      return state;
    default:
      return state;
  }
};

export default dataReducer;
