import moment from 'moment';
import React from 'react';
import {Text, View} from 'react-native';
import OptionsMenu from 'react-native-option-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import ProfilePicture from '../../../ProfilePicture';
import styles from './styles';

const Header = ({
  imageUri,
  name,
  rightIcon,
  viewProfilePictureHandler,
  createdAt,
  caption,
}) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.left}>
          <ProfilePicture uri={imageUri} size={50} />
          <View>
            <Text style={styles.name}>{name}</Text>
            {createdAt && (
              <Text style={styles.postedAt}>
                {moment(new Date(Math.abs(createdAt))).fromNow()}
              </Text>
            )}
          </View>
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
      {caption && <Text style={styles.caption}>{caption}</Text>}
    </View>
  );
};

export default Header;
