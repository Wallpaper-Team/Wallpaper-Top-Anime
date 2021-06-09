import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ProfilePicture from '../ProfilePicture';
import styles from './styles';

const Character = ({item, onItemClickHandler, showIcon}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onItemClickHandler}>
      {showIcon && <ProfilePicture uri={item.imageUrl} size={50} />}
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={showIcon ? styles.name : styles.nameBordered}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Character;
