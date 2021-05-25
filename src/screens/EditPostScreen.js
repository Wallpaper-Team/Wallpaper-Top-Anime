import React, {useEffect, useState} from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EditPostScreen = ({navigation, route}) => {
  const {items} = route?.params;
  const [images, setImages] = useState([...items]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Save"
          onPress={() => {
            navigation.navigate({
              name: 'Post',
              params: {images: images},
            });
          }}
        />
      ),
    });
  }, [images]);

  const deleteHandler = (index) => {
    setImages((images) => {
      images.splice(index, 1);
      return [...images];
    });
  };

  const renderItem = (item) => {
    return (
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: item.item}} />
        <Ionicons
          style={styles.closeButton}
          name="close"
          size={32}
          color={'white'}
          onPress={() => {
            deleteHandler(item.index);
          }}
        />
      </View>
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
    aspectRatio: 5 / 8,
  },
  image: {flex: 1, borderRadius: 20, marginHorizontal: 10, marginVertical: 5},
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export const screenOptions = ({navigation}) => {
  return {
    title: 'Edit Post',
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
  };
};

export default EditPostScreen;
