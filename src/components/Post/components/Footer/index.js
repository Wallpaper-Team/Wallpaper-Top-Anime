import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import Share from 'react-native-share';
import ADIcon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useDispatch, useSelector} from 'react-redux';
import {toggleLikeState} from '../../../../database/database-helper';
import * as fileActions from '../../../../store/actions/tempFiles';
import styles from './styles';

const Footer = ({item, likeCnt, commentCount, images}) => {
  console.log(item);
  const selected = useSelector((state) => state.character.selected);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likeCnt);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onFavoriteHandler = () => {
    toggleLikeState(isLiked, item, `Posts/${selected.name}`);
    setIsLiked((isLiked) => {
      if (isLiked) {
        setLikeCount((likeCount) => likeCount - 1);
      } else {
        setLikeCount((likeCount) => likeCount + 1);
      }
      return !isLiked;
    });
  };

  const onCommentHandler = () => {
    navigation.navigate('Comment', {item: item});
  };

  const onShareHandler = () => {
    const shareOptions = {
      title: 'Share images',
      url: images[0].full,
      failOnCancel: false,
    };

    try {
      Share.open(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  const navigateHanlder = () => {
    dispatch(fileActions.setFiles(images));
    navigation.navigate('Favorite', {
      screen: 'Favor',
    });
  };

  const onBookMarkHandler = () => {
    Alert.alert('BookMark', 'Add these images to favorite album?', [
      {text: 'Cancel'},
      {
        text: 'Ok',
        onPress: navigateHanlder,
      },
    ]);
  };

  return (
    <View style={styles.iconsContainer}>
      <View style={styles.leftIcons}>
        <TouchableOpacity onPress={onFavoriteHandler}>
          <View style={styles.button}>
            {isLiked ? (
              <ADIcon name="heart" size={24} color={'#e73838'} />
            ) : (
              <ADIcon name="hearto" size={24} color={'#545454'} />
            )}
            {likeCount && <Text style={styles.textButton}>{likeCount}</Text>}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCommentHandler}>
          <View style={styles.button}>
            <Fontisto name="comment" size={21} color={'#545454'} />
            {commentCount && (
              <Text style={styles.textButton}>{commentCount}</Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onShareHandler}>
          <View style={styles.button}>
            <Feather name="send" size={24} color="#545454" />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onBookMarkHandler}>
        <FAIcon name="bookmark-o" size={25} color={'#545454'} />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
