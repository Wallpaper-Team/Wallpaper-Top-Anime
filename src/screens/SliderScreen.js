import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Slider from '../components/UI/slider';

const SliderScreen = ({route}) => {
  const {images, index, handleLongPress} = route?.params;
  return (
    <SafeAreaView style={styles.container}>
      <Slider
        images={images}
        fullScreen
        handleLongPress={handleLongPress}
        initial={index}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content2: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'red',
  },
});

export default SliderScreen;
