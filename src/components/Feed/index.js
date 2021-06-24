import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import * as characterActions from '../../store/actions/character';
import * as dataActions from '../../store/actions/data';
import {AdView} from '../../utils/admob/AdView';
import Post from '../Post';
import Search from '../Search';
import ImageCustom from '../UI/image';

const Feed = ({feedMode}) => {
  const dispatch = useDispatch();
  const [isEmpty, setIsEmpty] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const selected = useSelector((state) => state.character.selected);
  const characters = useSelector((state) => state.character.characters);
  const posts = useSelector((state) => state.data.posts.get(selected));
  const navigation = useNavigation();

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
    if (characters.length == 0) {
      await dispatch(characterActions.fetchCharacters());
    }
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

  const renderItem = ({item, index}) => (
    <View>
      {(index + 1) % 5 == 0 && (
        <AdView loadOnMount={true} index={index} type="video" media={true} />
      )}
      <Post key={item.key + index} post={item} />
    </View>
  );

  const renderImageItem = ({item}) => {
    return <ImageCustom item={item} />;
  };

  const renderSearch = () => <Search showIcon={true} />;

  const renderSeparator = () => <View style={{height: 10}} />;

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

  if (feedMode)
    return (
      <FlatList
        data={posts}
        onRefresh={onRefreshHandler}
        refreshing={isRefreshing}
        onEndReached={onEndReachedHandler}
        onEndReachedThreshold={1}
        keyboardShouldPersistTaps="always"
        removeClippedSubviews
        renderItem={renderItem}
        ListHeaderComponent={renderSearch}
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={renderEmptyItem}
      />
    );

  return (
    <FlatList
      data={images}
      refreshing={isFetching}
      onRefresh={onRefreshHandler}
      renderItem={renderImageItem}
      removeClippedSubviews={true}
      numColumns={3}
      keyExtractor={(item, index) => item.full + index}
      onEndReached={onEndReachedHandler}
      onEndReachedThreshold={3}
      keyboardShouldPersistTaps="always"
      ListEmptyComponent={renderEmptyItem}
    />
  );
};

export default Feed;
