import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  fullimage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default styles;
