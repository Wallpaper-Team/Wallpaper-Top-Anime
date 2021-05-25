import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfilePicture from '../ProfilePicture';
import styles from '../Character/styles';

const Character1 = (props) => {
  const {key, imageUrl, name} = props.character;
  const [isSelected, setIsSeleted] = useState(props.isSelected);

  const onPress = () => {
    props.onItemClickHandler(key);
    setIsSeleted((val) => !val);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {isSelected && (
        <Ionicons
          style={styles.checked}
          name="checkmark-done-circle"
          size={24}
          color="#2196F3"
        />
      )}
      <ProfilePicture uri={imageUrl} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Character1;
