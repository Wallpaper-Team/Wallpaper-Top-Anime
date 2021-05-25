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

  const urls = useSelector((state) => state.file.files);
  const dispatch = useDispatch();

  useEffect(() => {
    const unscribe = database()
      .ref(`Albums/${item}`)
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
    return () => database().ref(`Albums/${item}`).off('value', unscribe);
  }, [item]);

  const deleteHandler = () => {
    database().ref(`Albums/${item}`).set(null);
  };

  const onPressAlbumHandler = () => {
    if (!!urls) {
      database()
        .ref(`Albums/${item}/images`)
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
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1 / 2,
    aspectRatio: 3 / 4,
    elevation: 5,
  },
  image: {
    height: '75%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginHorizontal: 5,
    marginTop: 5,
    backgroundColor: 'gray',
  },
  bottomCard: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    backgroundColor: 'yellow',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  imageCountText: {},
  deleteButton: {
    position: 'absolute',
    right: 10,
  },
});

export default AlbumCustom;
