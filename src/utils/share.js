import Share from 'react-native-share';

export const shareApp = () => {
  const shareOptions = {
    title: 'Share App',
    url:
      'https://play.google.com/store/apps/details?id=wallpaper.app.ducky.com.deadlysinswallpaper',
    failOnCancel: false,
  };

  try {
    Share.open(shareOptions);
  } catch (error) {
    console.log('Error =>', error);
  }
};
