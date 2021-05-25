import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {Alert, Image, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import * as fileActions from '../../store/actions/tempFiles';

const ImageCustom = (props) => {
  const {item} = props;
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);

  const dispatch = useDispatch();

  const onFavoriteHandler = () => {
    onLongPressHandler();
  };

  const navigateHanlder = () => {
    setIsLiked(true);
    dispatch(fileActions.setFiles([item]));
    navigation.navigate('Favorite', {
      screen: 'Favor',
    });
  };

  const onLongPressHandler = () => {
    Alert.alert('BookMark', 'Add this image to favorite album?', [
      {text: 'Cancel'},
      {
        text: 'Ok',
        onPress: navigateHanlder,
      },
    ]);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onLongPress={onLongPressHandler}
      onPress={() => navigation.navigate('Preview', {item: item})}>
      <Image style={styles.image} source={{uri: item.medium}} />
      {props.rightButton ? (
        props.rightButton
      ) : (
        <TouchableOpacity
          style={styles.heartButton}
          onPress={onFavoriteHandler}>
          {isLiked ? (
            <AntDesign name="heart" size={30} color={'red'} />
          ) : (
            <AntDesign name="hearto" size={30} color={'white'} />
          )}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1 / 3,
    aspectRatio: 5 / 8,
  },
  image: {flex: 1, borderRadius: 5, marginLeft: 5, marginTop: 5},
  heartButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});

export default ImageCustom;
