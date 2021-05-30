import database from '@react-native-firebase/database';

export const SET_DATA = 'SET_DATA';
export const SET_MORE = 'SET_MORE';
const PAGE_SIZE = 5;

let lastFeedTime;

export const fetchData = () => async (dispatch, getState) => {
  lastFeedTime = -Infinity;
  const selected = getState().character.selected;
  database()
    .ref(`Posts/${selected.name}`)
    .orderByChild('createdAt')
    .limitToFirst(PAGE_SIZE)
    .once('value', (snapshot) => {
      console.log('Snapshot', snapshot);
      const listPost = [];
      const listImage = [];
      snapshot.forEach((item) => {
        const feed = item.val();
        feed.images.forEach((image) => listImage.push(image));
        lastFeedTime = Math.max(lastFeedTime, feed.createdAt);
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
      });
    });
};

export const fetchMoreData = () => async (dispatch, getState) => {
  const selected = getState().character.selected;
  database()
    .ref(`Posts/${selected.name}`)
    .orderByChild('createdAt')
    .startAt(lastFeedTime + 1)
    .limitToFirst(PAGE_SIZE)
    .once('value', (snapshot) => {
      const listFeed = [];
      const listImage = [];
      snapshot.forEach((item) => {
        const feed = item.val();
        feed.images.forEach((image) => listImage.push(image));
        lastFeedTime = Math.max(lastFeedTime, feed.createdAt);
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
      });
    });
};
