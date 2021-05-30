import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import * as characterActions from '../../store/actions/character';
import * as dataActions from '../../store/actions/data';
import Character from '../Character';
import Post from '../Post';

const Feed = () => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const feeds = useSelector((state) => state.data.posts);
  const characters = useSelector((state) => state.character.characters);

  const navigation = useNavigation();

  const fetchData = async () => {
    setIsFetching(true);
    if (!characters.length) {
      dispatch(characterActions.fetchCharacters());
    }
    // dispatch(dataActions.fetchData());
    setIsFetching(false);
  };

  const onEndReachedHandler = () => {
    // dispatch(dataActions.fetchMoreData());
  };

  useEffect(() => {
    fetchData();
  }, [navigation]);

  const onRefreshHandler = () => {
    // fetchData();
  };

  const onItemCharacterClickHandler = (item) => {
    dispatch(characterActions.selectCharacter(item));
    fetchData();
  };

  const createFirstPostHandler = () => {
    navigation.navigate('Post');
  };

  const clearHandler = () => {
    dispatch(characterActions.clearSelect());
    fetchData();
  };

  return (
    <View>
      <FlatList
        data={characters}
        keyExtractor={({key, index}) => key + index}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <Character
              item={item}
              onItemClickHandler={() => onItemCharacterClickHandler(item)}
            />
          );
        }}
      />
      <FlatList
        data={feeds}
        onRefresh={onRefreshHandler}
        refreshing={isFetching}
        renderItem={({item, index}) => (
          <Post key={item.key + index} post={item} />
        )}
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
      />
    </View>
  );
};

export default Feed;
