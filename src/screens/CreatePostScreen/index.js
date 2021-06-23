import database from '@react-native-firebase/database';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FbGrid from 'react-native-fb-image-grid';
import ImagePicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Post/components/Header';
import ProfilePicture from '../../components/ProfilePicture';

const SERVER_URL = 'https://api.imgbb.com/1/upload';
const KEY_API = '02308d06cea46acb65cdd23ccd651afb';

export const getFileName = (filePath) => {
  return filePath.substring(filePath.lastIndexOf('/') + 1);
};

export const upLoadImage = async (photo) => {
  const formData = new FormData();
  formData.append('image', photo.data);
  formData.append('key', KEY_API);

  const result = await axios(SERVER_URL, {
    method: 'POST',
    data: formData,
  });
  if (result.status == 200) {
    const data = result.data.data;
    return {
      full: data.url,
      medium: data.medium ? data.medium.url : data.url,
    };
  }
  return null;
};

const CreatePostScreen = (props) => {
  const userInfo = useSelector((state) => state.auth);
  const [canPost, setCanPost] = useState(false);
  const [caption, setCaption] = useState();
  const [images, setImages] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [tag, setTag] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  const characters = useSelector((state) => state.character.characters);

  const reset = () => {
    setCaption('');
    setImages([]);
    setIsPosting(false);
    setTag(null);
  };

  const postHandler = async () => {
    setIsPosting(true);
    const listImage = [];
    await Promise.all(
      images.map(async (image) => {
        const url = await upLoadImage(image);
        if (url) {
          listImage.push(url);
        }
      }),
    );
    const post = {
      user: {
        userName: userInfo.userName,
        userPhoto: userInfo.userPhoto,
        userId: userInfo.userId,
      },
      createdAt: -new Date().getTime(),
      images: listImage,
      caption: caption,
    };
    const ref = database().ref(`Posts/${tag.name}`).push();
    ref.set(post);
    const userKey = userInfo.userId;
    const userRef = database().ref(`Users/${userKey}`);
    userRef.child('postCount').transaction((count) => {
      if (!count) return 1;
      return count + 1;
    });
    userRef.child('photoCount').transaction((count) => {
      if (!count) return listImage.length;
      return count + listImage.length;
    });
    reset();
    Alert.alert('Posted successfully!', 'Go to news feed?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => {
          props.navigation.navigate('Home');
        },
        style: 'default',
      },
    ]);
  };

  const onPressItemHandler = () => {
    if (isPosting) return;
    props.navigation.navigate('Edit', {items: images});
  };

  React.useEffect(() => {
    if (props.route.params?.images) {
      setImages([...props.route.params.images]);
    }
  }, [props.route.params?.images]);

  useEffect(() => {
    setCanPost(caption && caption.length != 0 && images.length != 0 && !!tag);
  }, [caption, images, tag]);

  useEffect(() => {
    const photos = [];
    images.forEach((image) => photos.push(image.path));
    setPhotos(photos);
  }, [images]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Feather
          name="camera"
          size={25}
          color={'#000'}
          onPress={pickImageHandler}
        />
      ),
    });
  }, [props.navigation, images]);

  const pickImageHandler = () => {
    if (isPosting) return;
    ImagePicker.openPicker({
      multiple: true,
      includeBase64: true,
      mediaType: 'photo',
    }).then((photos) => {
      setImages(images.concat(photos));
    });
  };

  const onItemClickHandler = (item) => {
    if (isPosting) return;
    setTag((tag) => (tag === item ? null : item));
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <Header
        imageUri={userInfo.userPhoto}
        name={userInfo.userName}
        rightIcon={
          isPosting ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <Button title="Post" onPress={postHandler} disabled={!canPost} />
          )
        }
      />
      <TextInput
        style={styles.inputArea}
        autoCapitalize="sentences"
        placeholder="Write a caption"
        multiline={true}
        value={caption}
        onChangeText={(text) => setCaption(text)}
      />
      {images.length != 0 && (
        <View style={styles.tagContainer}>
          <Text style={styles.tagTitle}>
            {`#${tag ? tag.name : 'Tag characters in your images'}`}
          </Text>
          <FlatList
            data={characters}
            keyExtractor={({key}) => key}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            style={styles.container}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => onItemClickHandler(item)}
                  style={{width: 80}}>
                  {tag === item && (
                    <Ionicons
                      style={styles.checked}
                      name="checkmark-done-circle"
                      size={24}
                      color="#2196F3"
                    />
                  )}
                  <ProfilePicture uri={item.imageUrl} size={80} />
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.name}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      <FbGrid
        style={styles.imageGrid}
        images={photos}
        onPress={onPressItemHandler}
      />
      <View style={styles.notice}>
        <Text style={styles.noticeText}>Pick some images</Text>
        <TouchableOpacity onPress={pickImageHandler}>
          <Entypo name="images" size={50} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export const screenOptions = ({navigation}) => {
  return {
    title: 'Create Post',
    headerLeftContainerStyle: {
      marginLeft: 15,
    },
    headerRightContainerStyle: {
      marginRight: 15,
    },
    headerLeft: () => (
      <Ionicons
        name="close"
        size={25}
        color={'#000'}
        onPress={() => {
          navigation.goBack();
        }}
      />
    ),
  };
};

const styles = StyleSheet.create({
  name: {
    textAlign: 'center',
  },
  checked: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  container: {
    flex: 1,
  },
  inputArea: {
    margin: 10,
  },
  tagContainer: {
    flex: 1,
  },
  hashTag: {
    fontWeight: '900',
    fontSize: 16,
    marginLeft: 10,
    backgroundColor: 'cornflowerblue',
  },
  tagTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 10,
  },
  imageGrid: {
    height: '50%',
    minHeight: 400,
  },
  notice: {
    flex: 1,
    paddingTop: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noticeText: {
    fontSize: 14,
  },
});

export default CreatePostScreen;
