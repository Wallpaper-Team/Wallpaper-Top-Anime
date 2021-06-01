import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AlbumScreen = ({navigation, route}) => {
  const {key, items, title} = route?.params;
  const [images, setImages] = useState([...items]);

  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, []);

  const deleteHandler = (index) => {
    setImages((images) => {
      images.splice(index, 1);
      const newArr = [...images];
      return newArr;
    });
    database().ref(`Albums/${key}/images`).set(images);
  };

  const onPressHandler = (index) => {
    navigation.navigate('Slider', {images: images, index: index});
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => onPressHandler(item.index)}>
        <Image style={styles.image} source={{uri: item.item.medium}} />
        <AntDesign
          style={styles.closeButton}
          name="delete"
          size={24}
          color={'black'}
          onPress={() => {
            deleteHandler(item.index);
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={images}
      renderItem={(item) => renderItem(item)}
      numColumns={2}
      keyExtractor={(item, index) => index}
    />
  );
};
const styles = StyleSheet.create({
  card: {
    flex: 1 / 2,
    aspectRatio: 9 / 16,
  },
  image: {flex: 1, borderRadius: 10, marginHorizontal: 5, marginVertical: 5},
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export const screenOptions = ({navigation}) => {
  return {
    headerLeftContainerStyle: {
      marginLeft: 15,
    },
    headerRightContainerStyle: {
      marginRight: 15,
    },
    headerLeft: () => (
      <Ionicons
        name="arrow-back"
        size={25}
        color={'#000'}
        onPress={() => {
          navigation.goBack();
        }}
      />
    ),
    headerRight: () => (
      <Ionicons
        name="add-circle-outline"
        size={32}
        color={'#000'}
        onPress={() => {
          Alert.alert(
            'Add image',
            'Go to news feed bookmark new image to this album?',
            [
              {text: 'Cancel'},
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('Home');
                },
              },
            ],
          );
        }}
      />
    ),
  };
};

export default AlbumScreen;
