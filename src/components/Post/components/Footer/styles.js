import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    marginHorizontal: 10,
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
});

export default styles;
