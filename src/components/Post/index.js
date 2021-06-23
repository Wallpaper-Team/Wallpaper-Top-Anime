import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import FbGrid from 'react-native-fb-image-grid/src/fb_grid/fb_grid';
import Footer from './components/Footer';
import Header from './components/Header';

const width = Dimensions.get('window').width;

const Post = ({post}) => {
  const navigation = useNavigation();
  const viewProfilePictureHandler = () => {
    navigation.navigate('ProfilePicture', {imageUri: post.user.userPhoto});
  };

  const [images, setImages] = useState([]);

  useEffect(() => {
    const listImage = [];
    post.images.map((image) => listImage.push(image.medium));
    setImages(listImage);
  }, [post]);

  const onPressHandler = (index) => {
    navigation.navigate('Slider', {
      images: post.images,
      index: index,
      handleLongPress: true,
    });
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
      <FbGrid
        style={{width: width, height: width}}
        images={images}
        onPress={(_image, index) => {
          onPressHandler(index);
        }}
      />
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
