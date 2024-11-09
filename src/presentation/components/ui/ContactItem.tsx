import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import {colors} from '../../../config/theme/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

interface Props {
  id: string;
  name: string;
  telephone: string;
  email: string;
  role: string;
  image?: string;
  isFirst?: boolean;
  isLast?: boolean;
  onPress?: () => void;
}

export const ContactItem = ({
  id,
  name,
  telephone,
  email,
  role,
  image,
  isFirst = false,
  isLast = false,
}: Props) => {
  const navigation = useNavigation<any>();
  const contact = {id,name, telephone, email, role, image};

  return (
    <Pressable
      onPress={() => navigation.navigate('ProfileContactScreen', {contact})}>
      <View
        style={{
          ...styles.container,
          backgroundColor: colors.cardBackground,
          ...(isFirst && {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingTop: 10,
          }),
          ...(isLast && {
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingBottom: 10,
          }),
        }}>
        {image ? (
          <Image
            source={{uri: image}}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        ) : (
          <Icon
            name="account-circle"
            size={25}
            style={{marginRight: 10}}
            color={colors.primary}
          />
        )}
        <Text style={{color: colors.text}}>{name}</Text>
        <Icon
          name="arrow-forward-ios"
          size={25}
          style={{marginLeft: 'auto', color: colors.primary}}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});
