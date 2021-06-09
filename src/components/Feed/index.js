import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import * as dataActions from '../../store/actions/data';
import {AdView} from '../../utils/admob/AdView';
import Post from '../Post';
import Search from '../Search';

const Feed = () => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const selected = useSelector((state) => state.character.selected);

  const posts = useSelector((state) => state.data.posts.get(selected));
  const navigation = useNavigation();

  const fetchData = async () => {
    setIsFetching(true);
    if (selected && !posts) {
      dispatch(dataActions.fetchData());
    }
    setIsFetching(false);
  };

  const onEndReachedHandler = () => {
    dispatch(dataActions.fetchMoreData());
  };

  useEffect(() => {
    fetchData();
  }, [selected]);

  const onRefreshHandler = () => {
    dispatch(dataActions.fetchData());
  };

  const createFirstPostHandler = () => {
    navigation.navigate('Post');
  };

  return (
    <FlatList
      data={posts}
      onRefresh={onRefreshHandler}
      refreshing={isFetching}
      onEndReached={onEndReachedHandler}
      onEndReachedThreshold={2}
      renderItem={({item, index}) => (
        <View>
          {(index + 1) % 5 == 0 && (
            <AdView
              loadOnMount={true}
              index={index}
              type="video"
              media={true}
            />
          )}
          <Post key={item.key + index} post={item} />
        </View>
      )}
      ListHeaderComponent={() => <Search showIcon={true} />}
      ListEmptyComponent={() => (
        <View
          style={{
            flex: 1,
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>No feed, let's create the first one</Text>
          <TouchableOpacity onPress={createFirstPostHandler}>
            <Ionicons name="ios-create-outline" size={50} />
          </TouchableOpacity>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
    />
  );
};

export default Feed;
