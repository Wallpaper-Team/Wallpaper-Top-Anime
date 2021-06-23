import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import * as fileActions from '../../store/actions/tempFiles';

const AlbumCustom = (props) => {
  const {item} = props;
  const navigation = useNavigation();
  const [imageUrl, setImageUrl] = useState();
  const [title, setTitle] = useState();
  const [imageCount, setImageCount] = useState();
  const [images, setImages] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  const urls = useSelector((state) => state.file.files);
  const dispatch = useDispatch();

  useEffect(() => {
    const unscribe = database()
      .ref(`Albums/${userId}/${item}`)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const album = snapshot.val();
          if (!album) {
            return;
          }
          setTitle(album.title);
          if (!!album.images) {
            setImages(album.images);
            setImageUrl(album.images[0].medium);
            setImageCount(album.images.length);
          } else {
            setImageUrl(null);
            setImageCount(0);
            setImages([]);
          }
        }
      });
    return () =>
      database().ref(`Albums/${userId}/${item}`).off('value', unscribe);
  }, [item]);

  const deleteHandler = () => {
    database().ref(`Albums/${userId}/${item}`).set(null);
  };

  const onPressAlbumHandler = () => {
    if (!!urls) {
      database()
        .ref(`Albums/${userId}/${item}/images`)
        .transaction((images) => [...new Set(urls.concat(images))]);
      alert('Images added to album');
      dispatch(fileActions.reset());
      navigation.goBack();
    } else {
      navigation.navigate('Album', {key: item, items: images, title: title});
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPressAlbumHandler}>
      <Image style={styles.image} source={{uri: imageUrl}} />
      <View style={styles.bottomCard}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleText}>
          {title}
        </Text>
        {!!imageCount && (
          <Text style={styles.imageCountText}>
            {imageCount} {imageCount > 1 ? 'images' : 'image'}
          </Text>
        )}
        <TouchableOpacity style={styles.deleteButton} onPress={deleteHandler}>
          <AntDesign name="delete" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1 / 2,
    aspectRatio: 4 / 5,
    elevation: 5,
    marginHorizontal: 5,
  },
  image: {
    flex: 1,
    borderRadius: 10,
    marginTop: 5,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '25%',
    backgroundColor: '#808080',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    opacity: 0.8,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    width: '80%',
  },
  imageCountText: {
    color: 'white',
    width: '80%',
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
  },
});

export default AlbumCustom;
