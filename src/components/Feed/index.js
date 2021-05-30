import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import * as characterActions from '../../store/actions/character';
import * as dataActions from '../../store/actions/data';
import Character from '../Character';
import Post from '../Post';

const Feed = () => {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const characters = useSelector((state) => state.character.characters);
  const selected = useSelector((state) => state.character.selected);

  const posts = useSelector((state) => state.data.posts.get(selected));
  const navigation = useNavigation();

  const fetchData = async () => {
    setIsFetching(true);
    if (!characters.length) {
      dispatch(characterActions.fetchCharacters());
    }
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

  const onItemCharacterClickHandler = (item) => {
    dispatch(characterActions.selectCharacter(item));
  };

  const createFirstPostHandler = () => {
    navigation.navigate('Post');
  };

  return (
    <View>
      <FlatList
        data={posts}
        onRefresh={onRefreshHandler}
        refreshing={isFetching}
        onEndReached={onEndReachedHandler}
        onEndReachedThreshold={1}
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
        ListHeaderComponent={() => (
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
        )}
        ItemSeparatorComponent={() => (
          <View style={{height: 15, backgroundColor: 'white'}} />
        )}
      />
    </View>
  );
};

export default Feed;
