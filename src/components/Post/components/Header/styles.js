import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    marginRight: 15,
  },
  name: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  postedAt: {
    color: '#8c8c8c',
    margin: 3,
    fontSize: 14,
  },
  caption: {
    marginLeft: 20,
    marginVertical: 10,
  },
});

export default styles;
