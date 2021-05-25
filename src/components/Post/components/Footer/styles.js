import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    marginRight: 10,
  },
  leftIcons: {
    flexDirection: 'row',
    width: 120,
    justifyContent: 'space-between',
  },
  button: {flexDirection: 'row', marginRight: 10},
  textButton: {marginLeft: 5, color: 'black'},
  textSelectedButton: {marginLeft: 5, fontWeight: 'bold', color: 'red'},
  likes: {
    fontWeight: 'bold',
    margin: 3,
    fontSize: 12,
  },
  caption: {
    margin: 3,
  },
  postedAt: {
    color: '#8c8c8c',
    margin: 3,
  },
});

export default styles;
