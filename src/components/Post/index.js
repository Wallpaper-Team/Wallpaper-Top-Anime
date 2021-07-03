import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import FbGrid from 'react-native-fb-image-grid/src/fb_grid/fb_grid';
import {useSelector} from 'react-redux';
import Footer from './components/Footer';
import Header from './components/Header';
import database from '@react-native-firebase/database';

const width = Dimensions.get('window').width;

const Post = ({post}) => {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);

  const selected = useSelector((state) => state.character.selected);

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

  const deleteHandler = () => {
    alert('Deleted');
    database().ref(`Posts/${selected.name}/${post.key}`).set(null);
  };

  const editHandler = () => {
    navigation.navigate('Edit', {items: post.images, saveHandler: saveHandler});
  };

  const saveHandler = (images) => {
    if (!images || images.length == 0) {
      deleteHandler();
      return;
    }
    alert('Save');
    database().ref(`Posts/${selected.name}/${post.key}/images`).set(images);
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <Header
        imageUri={post.user.userPhoto}
        name={post.user.userName}
        createdAt={post.createdAt}
        caption={post.caption}
        deleteHandler={deleteHandler}
        editHandler={editHandler}
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
