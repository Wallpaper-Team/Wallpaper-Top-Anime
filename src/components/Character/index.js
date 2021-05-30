import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import ProfilePicture from '../ProfilePicture';
import styles from './styles';

const Character = ({item, onItemClickHandler}) => {
  const selected = useSelector((state) => state.character.selected);

  return (
    <TouchableOpacity style={styles.container} onPress={onItemClickHandler}>
      {selected.indexOf(item) != -1 && (
        <Ionicons
          style={styles.checked}
          name="checkmark-done-circle"
          size={24}
          color="#2196F3"
        />
      )}
      <ProfilePicture uri={item.imageUrl} size={80} />
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Character;
