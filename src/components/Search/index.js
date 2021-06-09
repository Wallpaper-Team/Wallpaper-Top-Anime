import React, {useEffect, useState} from 'react';
import {FlatList, TextInput, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import * as characterActions from '../../store/actions/character';
import Character from '../Character';

const Search = (props) => {
  const [text, setText] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useDispatch();

  const characters = useSelector((state) => state.character.characters);

  useEffect(() => {
    if (characters.length == 0) {
      dispatch(characterActions.fetchCharacters());
    }
  }, []);

  const onItemCharacterClickHandler = (item) => {
    dispatch(characterActions.selectCharacter(item));
    setIsSearching(false);
  };

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 20,
      }}>
      <View
        style={{
          width: '90%',
          borderRadius: 20,
          flexDirection: 'row',
          backgroundColor: '#d3d3d3',
          opacity: 0.5,
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <AntDesign name="search1" size={24} color="black" />
        <TextInput
          placeholder="Search"
          style={{
            fontSize: 20,
            flex: 1,
          }}
          value={text}
          onChangeText={(text) => {
            setText(text);
          }}
          onFocus={() => {
            setIsSearching(true);
          }}
        />
      </View>
      {isSearching && (
        <FlatList
          data={characters.filter(
            (character) => character.name.indexOf(text) != -1,
          )}
          keyExtractor={({key, index}) => key + index}
          horizontal
          keyboardShouldPersistTaps="always"
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <Character
                item={item}
                onItemClickHandler={() => onItemCharacterClickHandler(item)}
                showIcon={props.showIcon}
              />
            );
          }}
        />
      )}
    </View>
  );
};

export default Search;
