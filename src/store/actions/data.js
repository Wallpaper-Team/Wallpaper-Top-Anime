import database from '@react-native-firebase/database';

export const SET_DATA = 'SET_DATA';
export const SET_MORE = 'SET_MORE';
export const INSERT_HEAD = 'INSERT_HEAD';

const PAGE_SIZE = 5;

export const insertHead = (post) => async (dispatch) => {
  dispatch({type: INSERT_HEAD, post: post});
};

export const fetchData = () => async (dispatch, getState) => {
  const selectedCharacters = getState().character.selected;
  let lastFeedTime = -Infinity;
  database()
    .ref('Posts')
    .orderByChild('createdAt')
    .limitToFirst(PAGE_SIZE)
    .once('value', (snapshot) => {
      const listFeed = [];
      const listImage = [];
      snapshot.forEach((item) => {
        const feed = item.val();
        lastFeedTime = Math.max(lastFeedTime, feed.createdAt + 1);
        feed.images.forEach((image) => listImage.push(image));
        if (
          selectedCharacters.length == 0 ||
          selectedCharacters.filter(
            (item) => feed.tags.indexOf(item.name) != -1,
          ).length > 0
        ) {
          listFeed.push({
            key: item.key,
            createdAt: Math.abs(feed.createdAt),
            caption: feed.caption,
            user: feed.user,
            images: feed.images,
            likeCount: feed.likeCount,
            commentCount: feed.commentCount,
          });
        }
      });
      if (listFeed.length === 0)
        fetchFeedsFrom(dispatch, lastFeedTime, selectedCharacters);
      dispatch({type: SET_DATA, posts: listFeed, images: listImage});
    });
};

export const fetchMoreData = () => async (dispatch, getState) => {
  const posts = getState().data.posts;
  if (posts.length == 0) return;
  let lastFeedTime = 1 - posts[posts.length - 1].createdAt;
  const selectedCharacters = getState().character.selected;
  fetchFeedsFrom(dispatch, lastFeedTime, selectedCharacters);
};

const fetchFeedsFrom = (dispatch, start, selectedCharacters) => {
  let lastFeedTime = start;
  database()
    .ref('Posts')
    .orderByChild('createdAt')
    .startAt(lastFeedTime)
    .limitToFirst(PAGE_SIZE)
    .once('value', (snapshot) => {
      const listFeed = [];
      const listImage = [];
      snapshot.forEach((item) => {
        const feed = item.val();
        feed.images.forEach((image) => listImage.push(image));
        lastFeedTime = Math.max(lastFeedTime, feed.createdAt + 1);
        if (
          selectedCharacters.length == 0 ||
          selectedCharacters.filter(
            (item) => feed.tags.indexOf(item.name) != -1,
          ).length > 0
        ) {
          listFeed.push({
            key: item.key,
            createdAt: Math.abs(feed.createdAt),
            caption: feed.caption,
            user: feed.user,
            images: feed.images,
            likeCount: feed.likeCount,
            commentCount: feed.commentCount,
          });
        }
      });
      if (lastFeedTime > start && listFeed.length === 0) {
        fetchFeedsFrom(dispatch, lastFeedTime, selectedCharacters);
      }
      dispatch({type: SET_MORE, posts: listFeed, images: listImage});
    });
};
