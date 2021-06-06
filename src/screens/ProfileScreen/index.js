import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../../store/actions/auth';
import {upLoadImage} from '../CreatePostScreen';
import ImagePicker from 'react-native-image-crop-picker';
import Rate from 'react-native-rate';
export const rateAppHandler = () => {
  const options = {
    GooglePackageName: 'wallpaper.app.ducky.com.deadlysinswallpaper',
  };
  Rate.rate(options, () => {});
};

const ProfileScreen = ({navigation}) => {
  const userId = useSelector((state) => state.auth.userId);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const unscribe = database()
      .ref(`Users/${userId}`)
      .on('value', (snapshot) => {
        setUserInfo(snapshot.val());
      });
    return () => {
      database().ref(`Users/${userId}`).off('value', unscribe);
    };
  }, []);

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const uploadImage = (type) => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
      mediaType: 'photo',
    }).then(async (image) => {
      if (!image.path) return;
      const imageUrl = await upLoadImage(image);
      if (imageUrl) {
        database()
          .ref(`Users/${userId}/${type}`)
          .transaction((url) => imageUrl.full);
        if (type === 'photoUrl') {
          dispatch(authActions.updateAvatar(imageUrl.full));
        }
      }
    });
  };

  const viewPostsHandler = () => {
    navigation.navigate('Home', {userId: userId});
  };

  const viewPhotosHandler = () => {
    navigation.navigate('Discovery', {userId: userId});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          source={{uri: userInfo?.coverImage}}
          style={styles.headerContent}>
          <View>
            <Image style={styles.avatar} source={{uri: userInfo?.photoUrl}} />
            <TouchableOpacity
              style={styles.buttonEdit}
              onPress={() => uploadImage('photoUrl')}>
              <Entypo name="camera" size={16} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{userInfo?.name}</Text>
          <TouchableOpacity
            style={styles.buttonEdit}
            onPress={() => uploadImage('coverImage')}>
            <Entypo name="camera" size={24} />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <View style={styles.profileDetail}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Photos</Text>
          <Text style={styles.count}>{userInfo?.photoCount | 0}</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Posts</Text>
          <Text style={styles.count}>{userInfo?.postCount | 0}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={viewPhotosHandler}>
            <Text style={styles.optionText}>Photos</Text>
            <Entypo
              style={styles.optionIcon}
              name="folder-images"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={viewPostsHandler}>
            <Text style={styles.optionText}>Posts</Text>
            <FontAwesome5
              style={styles.optionIcon}
              name="edit"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.buttonContainer, backgroundColor: 'gray'}}
            onPress={logoutHandler}>
            <Text style={styles.optionText}>Logout</Text>
            <Entypo
              style={styles.optionIcon}
              name="log-out"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.buttonContainer, backgroundColor: 'green'}}
            onPress={rateAppHandler}>
            <Text style={styles.optionText}>Rate this app</Text>
            <Entypo
              style={styles.optionIcon}
              name="star-outlined"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    backgroundColor: 'dodgerblue',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttonEdit: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    padding: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 24,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  profileDetail: {
    alignSelf: 'center',
    marginTop: 200,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
  detailContent: {
    margin: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  count: {
    fontSize: 18,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    marginTop: 40,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: 'dodgerblue',
  },
  optionIcon: {
    position: 'absolute',
    right: 30,
  },
  optionText: {
    fontSize: 18,
  },
  description: {
    fontSize: 20,
    color: '#00CED1',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ProfileScreen;
