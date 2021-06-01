import database from '@react-native-firebase/database';

export const SET_DATA = 'SET_DATA';
export const SET_MORE = 'SET_MORE';
const PAGE_SIZE = 10;

let lastPostTime;

export const fetchData = () => async (dispatch, getState) => {
  lastPostTime = -Infinity;
  const selected = getState().character.selected;
  database()
    .ref(`Posts/${selected.name}`)
    .orderByChild('createdAt')
    .limitToFirst(PAGE_SIZE)
    .once('value', (snapshot) => {
      const listPost = [];
      const listImage = [];
      snapshot.forEach((item) => {
        const feed = item.val();
        feed.images.forEach((image) => listImage.push(image));
        lastPostTime = Math.max(lastPostTime, feed.createdAt);
        listPost.push({
          key: item.key,
          createdAt: Math.abs(feed.createdAt),
          caption: feed.caption,
          user: feed.user,
          images: feed.images,
          likeCount: feed.likeCount,
          commentCount: feed.commentCount,
        });
      });
      dispatch({
        type: SET_DATA,
        selected: selected,
        posts: listPost,
        images: listImage,
        lastPostTime: lastPostTime,
      });
    });
};

export const fetchMoreData = () => async (dispatch, getState) => {
  const selected = getState().character.selected;
  lastPostTime = getState().data.lastPostTime.get(selected);
  database()
    .ref(`Posts/${selected.name}`)
    .orderByChild('createdAt')
    .startAt(lastPostTime + 1)
    .limitToFirst(PAGE_SIZE)
    .once('value', (snapshot) => {
      const listFeed = [];
      const listImage = [];
      snapshot.forEach((item) => {
        const feed = item.val();
        feed.images.forEach((image) => listImage.push(image));
        lastPostTime = Math.max(lastPostTime, feed.createdAt);
        listFeed.push({
          key: item.key,
          createdAt: Math.abs(feed.createdAt),
          caption: feed.caption,
          user: feed.user,
          images: feed.images,
          likeCount: feed.likeCount,
          commentCount: feed.commentCount,
        });
      });
      dispatch({
        type: SET_MORE,
        selected: selected,
        posts: listFeed,
        images: listImage,
        lastPostTime: lastPostTime,
      });
    });
};
