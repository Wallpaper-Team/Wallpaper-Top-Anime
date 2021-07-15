import {PermissionsAndroid, ToastAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
const {config, fs} = RNFetchBlob;
const PictureDir = fs.dirs.PictureDir;

export const getFileExtension = (filePath) => {
  return filePath.substring(filePath.lastIndexOf('.') + 1);
};

export const downloadGifImage = async (image_URL) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      ToastAndroid.show('Start downloading', 100);
      const res = await config({
        fileCache: true,
        appendExt: getFileExtension(image_URL),
      }).fetch('GET', image_URL);
      const filePath = res.path();
      return filePath;
    } else {
      ToastAndroid.show('Can not download', 100);
      return null;
    }
  } catch (err) {
    ToastAndroid.show(err.message, 100);
    return null;
  }
};

export const getFileName = (filePath) => {
  return filePath.substring(filePath.lastIndexOf('/') + 1);
};

export const downloadImage = async (image_URL) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      ToastAndroid.show('Start downloading', 100);
      await config({
        fileCache: true,
        addAndroidDownloads: {
          //Related to the Android only
          useDownloadManager: true,
          path: PictureDir + '/' + getFileName(image_URL),
          notification: true,
          description: 'Image',
        },
      }).fetch('GET', image_URL);
      return true;
    } else {
      ToastAndroid.show('Can not download', 100);
      return false;
    }
  } catch (err) {
    ToastAndroid.show(err.message, 100);
    return false;
  }
};
