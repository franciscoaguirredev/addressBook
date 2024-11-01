import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../config/theme/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

interface Props {
  name: string;
  telephone: string;
  email: string;
  role: string;
  isFirst?: boolean;
  isLast?: boolean;
}

export const ContactItem = ({
  name,
  telephone,
  email,
  role,
  isFirst = false,
  isLast = false,
}: Props) => {
  const navigation = useNavigation<any>();
  const contact = {name, telephone, email, role};

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
        <Icon
          name="account-circle"
          size={25}
          style={{marginRight: 10}}
          color={colors.primary}
        />
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
});
