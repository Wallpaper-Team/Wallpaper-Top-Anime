import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: 70,
    alignItems: 'center',
  },
  name: {
    textAlign: 'center',
  },
  nameBordered: {
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'gray',
    opacity: 0.5,
    padding: 5,
  },
  checked: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default styles;
