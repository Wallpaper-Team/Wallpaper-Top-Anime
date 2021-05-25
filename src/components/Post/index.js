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
    <View>
      <Header
        imageUri={post.user.userPhoto}
        name={post.user.userName}
        viewProfilePictureHandler={viewProfilePictureHandler}
      />
      <Slider images={post.images} handlePress />
      <Footer item={post} />
    </View>
  );
};

export default Post;
