import React, {useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import ManageWallpaper, {TYPE} from 'react-native-manage-wallpaper';
import OptionsMenu from 'react-native-option-menu';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {downloadImage} from '../../utils/filedownload';
import {showToastWithGravityAndOffset} from '../../utils/toast';
import styles from './styles';

const OptionsFooter = (props) => {
  const [downloadState, setDownloadState] = useState(0);
  const [isSetting, setIsSetting] = useState(0);

  const onDownloadHandler = async () => {
    setDownloadState(1);
    const res = await downloadImage(props.imageUrl);
    if (res) {
      showToastWithGravityAndOffset('Saved image');
      setDownloadState(2);
    } else {
      setDownloadState(0);
    }
  };

  const _callback = () => {
    setIsSetting(false);
    showToastWithGravityAndOffset('Wallpaper was set');
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
        <OptionsMenu
          customButton={
            <Text style={styles.textInput}>
              {isSetting ? 'Setting...' : 'Set as wallpaper'}
            </Text>
          }
          destructiveIndex={3}
          options={['Home screen', 'Lock screen', 'Both', 'Cancel']}
          actions={[
            () => setWallpaperHandler(TYPE.HOME),
            () => setWallpaperHandler(TYPE.LOCK),
            () => setWallpaperHandler(TYPE.BOTH),
          ]}
        />
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
