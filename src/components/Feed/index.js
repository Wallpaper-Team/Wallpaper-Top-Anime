import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as dataActions from '../../store/actions/data';
import Post from '../Post';
import Search from '../Search';
import ImageCustom from '../UI/image';

const Feed = ({feedMode}) => {
  const dispatch = useDispatch();
  const [isEmpty, setIsEmpty] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const selected = useSelector((state) => state.character.selected);
  const posts = useSelector((state) => state.data.posts.get(selected));

  const [images, setImages] = useState([]);
  useEffect(() => {
    if (!!posts) {
      const list = [];
      posts.map((post) => {
        post.images.forEach((image) => {
          list.push(image);
        });
      });
      setImages(list);
    }
  }, [posts]);

  const fetchData = async () => {
    setIsEmpty(false);
    setIsFetching(true);
    if (selected && !posts) {
      const res = await dispatch(dataActions.fetchData());
      if (!res) setIsEmpty(true);
    }
    setIsFetching(false);
  };

  const onEndReachedHandler = async () => {
    dispatch(dataActions.fetchMoreData());
  };

  useEffect(() => {
    fetchData();
  }, [selected]);

  const onRefreshHandler = async () => {
    setIsRefreshing(true);
    const res = await dispatch(dataActions.fetchData());
    if (!res) setIsEmpty(true);
    setIsRefreshing(false);
  };

  const renderItem = ({item, index}) => {
    if (feedMode) return <Post key={item.key + index} post={item} />;
    else return <ImageCustom key={item.full + index} item={item} />;
  };

  const renderSearch = () => <Search showIcon={true} />;

  const renderSeparator = () => {
    if (feedMode) return <View style={{height: 10}} />;
    return null;
  };

  const renderEmptyItem = () => {
    if (isEmpty) {
      return (
        <View
          style={{
            flex: 1,
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>There is no item</Text>
        </View>
      );
    }
    return <></>;
  };

  const renderLoading = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Loading..</Text>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  };

  if (isFetching) return renderLoading();

  return (
    <FlatList
      data={feedMode ? posts : images}
      onRefresh={onRefreshHandler}
      refreshing={isRefreshing}
      onEndReached={onEndReachedHandler}
      onEndReachedThreshold={feedMode ? 1 : 3}
      numColumns={feedMode ? 1 : 3}
      keyboardShouldPersistTaps="always"
      removeClippedSubviews
      renderItem={renderItem}
      ListHeaderComponent={renderSearch}
      ItemSeparatorComponent={renderSeparator}
      ListFooterComponent={renderEmptyItem}
      keyExtractor={(item, index) => JSON.stringify(item) + index}
    />
  );
};

export default Feed;
