import React from 'react';
import {Text, View} from 'react-native';
import OptionsMenu from 'react-native-option-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import ProfilePicture from '../../../ProfilePicture';
import styles from './styles';

const Header = ({imageUri, name, rightIcon, viewProfilePictureHandler}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <ProfilePicture uri={imageUri} size={50} />
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.right}>
        {rightIcon ? (
          rightIcon
        ) : (
          <OptionsMenu
            customButton={
              <Entypo name="dots-three-vertical" size={16} color="black" />
            }
            options={['View profile picture', 'Cancel']}
            actions={[viewProfilePictureHandler]}
          />
        )}
      </View>
    </View>
  );
};

export default Header;
