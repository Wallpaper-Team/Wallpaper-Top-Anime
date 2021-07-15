import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GifWallpaper from 'react-native-gif-wallpaper';
import ManageWallpaper, {TYPE} from 'react-native-manage-wallpaper';
import OptionsMenu from 'react-native-option-menu';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {interstitial} from '../../utils/admob/Interstitial';
import {downloadGifImage, downloadImage} from '../../utils/filedownload';
import {showToastWithGravityAndOffset} from '../../utils/toast';
import styles from './styles';

const OptionsFooter = (props) => {
  const [downloadState, setDownloadState] = useState(0);
  const [isSetting, setIsSetting] = useState(0);

  const [loaded, setLoaded] = useState();
  const [isGifImage, setIsGifImage] = useState();
  const [imageDownload, setImageDownload] = useState();

  useEffect(() => {
    if (props.imageUrl.indexOf('.gif') != -1) {
      setIsGifImage(true);
    }
    const eventListener = interstitial.onAdEvent((type) => {
      if (type !== AdEventType.LOADED) {
        setLoaded(false);
        interstitial.load();
      } else {
        setLoaded(true);
      }
    });

    interstitial.load();

    return () => {
      eventListener();
    };
  }, []);

  const showInterstialAd = () => {
    if (loaded) {
      try {
        if (!__DEV__) interstitial.show();
      } catch (error) {
        console.log(error.message);
        interstitial.load();
      }
    }
  };

  const onDownloadHandler = async () => {
    showInterstialAd();
    setDownloadState(1);
    const res = isGifImage
      ? await downloadGifImage(props.imageUrl)
      : await downloadImage(props.imageUrl);
    if (!!res) {
      showToastWithGravityAndOffset('Saved image');
      setDownloadState(2);
    } else {
      setDownloadState(0);
    }
    return res;
  };

  const _callback = () => {
    setIsSetting(false);
    showToastWithGravityAndOffset('Wallpaper was set');
    showInterstialAd();
  };

  const setLiveWallpaperHandler = () => {
    Alert.alert('Set live wallpaper', 'Need to download gif before setting..', [
      {text: 'Cancel'},
      {
        text: 'Ok',
        onPress: async () => {
          const filePath = await onDownloadHandler();
          const uri = 'file://' + filePath;
          GifWallpaper.setUpLiveWallpaper(uri);
        },
      },
    ]);
  };

  const setWallpaperHandler = (type) => {
    setIsSetting(true);
    ManageWallpaper.setWallpaper(
      {
        uri: props.imageUrl,
      },
      _callback,
      type,
    );
  };

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.textInputContainer}>
        {isGifImage ? (
          <TouchableOpacity onPress={setLiveWallpaperHandler}>
            <Text style={styles.textInput}>
              {isSetting ? 'Setting...' : 'Set as wallpaper'}
            </Text>
          </TouchableOpacity>
        ) : (
          <OptionsMenu
            customButton={
              <Text style={styles.textInput}>
                {isSetting ? 'Setting...' : 'Set as wallpaper'}
              </Text>
            }
            onPress={() => {
              console.log('On press');
            }}
            destructiveIndex={3}
            options={['Home screen', 'Lock screen', 'Both', 'Cancel']}
            actions={[
              () => setWallpaperHandler(TYPE.HOME),
              () => setWallpaperHandler(TYPE.LOCK),
              () => setWallpaperHandler(TYPE.BOTH),
            ]}
          />
        )}
      </View>

      <View style={styles.messageButton}>
        {!downloadState ? (
          <Feather
            name="download"
            size={35}
            color={'white'}
            onPress={onDownloadHandler}
          />
        ) : downloadState == 1 ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <MaterialIcons name="done" size={45} color="blue" />
        )}
      </View>
    </View>
  );
};

export default OptionsFooter;
