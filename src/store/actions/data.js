import database from '@react-native-firebase/database';

export const SET_DATA = 'SET_DATA';
export const SET_MORE = 'SET_MORE';
const PAGE_SIZE = 10;

let lastPostTime;

export const fetchData = () => async (dispatch, getState) => {
  const selected = getState().character.selected;
  lastPostTime = -Infinity;
  const snapshot = await database()
    .ref(`Posts/${selected.name}`)
    .orderByChild('createdAt')
    .limitToFirst(PAGE_SIZE)
    .once('value');
  if (!snapshot.val()) return 0;
  const listFeed = [];
  snapshot.forEach((item) => {
    const feed = item.val();
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
    type: SET_DATA,
    selected: selected,
    posts: listFeed,
    lastPostTime: lastPostTime,
  });
  return 1;
};

export const fetchMoreData = () => async (dispatch, getState) => {
  const selected = getState().character.selected;
  lastPostTime = getState().data.lastPostTime.get(selected);
  const snapshot = await database()
    .ref(`Posts/${selected.name}`)
    .orderByChild('createdAt')
    .startAt(lastPostTime + 1)
    .limitToFirst(PAGE_SIZE)
    .once('value');
  if (!snapshot.val()) return 0;
  const listFeed = [];
  snapshot.forEach((item) => {
    const feed = item.val();
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
    lastPostTime: lastPostTime,
  });
  return 1;
};
