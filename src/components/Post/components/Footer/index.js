import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Alert, Text, TouchableWithoutFeedback, View} from 'react-native';
import Share from 'react-native-share';
import ADIcon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useDispatch, useSelector} from 'react-redux';
import {toggleLikeState} from '../../../../database/database-helper';
import * as fileActions from '../../../../store/actions/tempFiles';
import styles from './styles';

const Footer = ({item}) => {
  const userInfo = useSelector((state) => state.auth);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likeCount);
  const [commentCount, setCommentCount] = useState(item.commentCount);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const key = userInfo.userId + '_' + item.key;
    database()
      .ref(`Likes/${key}`)
      .once('value', (snapshot) => {
        if (snapshot.val()) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      });
  }, []);

  const onFavoriteHandler = () => {
    toggleLikeState(userInfo.userId, item.key, 'Posts');
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
    navigation.navigate('Comment', {item: item.key});
  };

  const onShareHandler = () => {
    const shareOptions = {
      title: 'Share images',
      url: item.images[0].full,
      failOnCancel: false,
    };

    try {
      Share.open(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  const navigateHanlder = () => {
    dispatch(fileActions.setFiles(item.images));
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
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        <View style={styles.leftIcons}>
          <TouchableWithoutFeedback onPress={onFavoriteHandler}>
            <View style={styles.button}>
              {isLiked ? (
                <ADIcon name="heart" size={24} color={'#e73838'} />
              ) : (
                <ADIcon name="hearto" size={24} color={'#545454'} />
              )}
              <Text
                style={isLiked ? styles.textSelectedButton : styles.textButton}>
                Love
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onCommentHandler}>
            <View style={styles.button}>
              <Fontisto name="comment" size={21} color={'#545454'} />
              <Text style={styles.textButton}>Comment</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onShareHandler}>
            <View style={styles.button}>
              <Feather name="send" size={24} color="#545454" />
              <Text style={styles.textButton}>Share</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback onPress={onBookMarkHandler}>
          <FAIcon name="bookmark-o" size={25} color={'#545454'} />
        </TouchableWithoutFeedback>
      </View>

      <View style={{flexDirection: 'row'}}>
        {!!likeCount && (
          <Text style={styles.likes}>
            {likeCount > 1
              ? `${likeCount} likes     `
              : `${likeCount} like    `}
          </Text>
        )}
        {!!commentCount && (
          <Text style={styles.likes}>
            {commentCount > 1
              ? `${commentCount} comments`
              : `${commentCount} comment`}
          </Text>
        )}
      </View>
      <Text style={styles.caption}>{item.caption}</Text>
      <Text style={styles.postedAt}>
        {moment(new Date(Math.abs(item.createdAt))).fromNow()}
      </Text>
    </View>
  );
};

export default Footer;
