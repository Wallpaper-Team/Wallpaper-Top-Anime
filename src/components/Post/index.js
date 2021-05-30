import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View} from 'react-native';
import Slider from '../UI/slider';
import Footer from './components/Footer';
import Header from './components/Header';

const Post = ({post}) => {
  const navigation = useNavigation();
  const viewProfilePictureHandler = () => {
    navigation.navigate('ProfilePicture', {imageUri: post.user.userPhoto});
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <Header
        imageUri={post.user.userPhoto}
        name={post.user.userName}
        viewProfilePictureHandler={viewProfilePictureHandler}
        createdAt={post.createdAt}
        caption={post.caption}
      />
      <Slider images={post.images} handlePress />
      <Footer
        item={post.key}
        images={post.images}
        likeCnt={post.likeCount}
        commentCount={post.commentCount}
      />
    </View>
  );
};

export default Post;
