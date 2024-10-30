// HomeScreen.tsx
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {colors, globalStyles} from '../../config/theme/theme';
import {Title} from '../../presentation/components/ui/Title';
import {ScrollView} from 'react-native-gesture-handler';
import {ContactItem} from '../../presentation/components/ui/ContactItem';
import {ContactsList} from '../../config/constants/ContactsList';
import {sortContacts} from '../../config/utils/sortContacts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

export const HomeScreen = () => {
  const sortedContacts = sortContacts(ContactsList);
  const navigation = useNavigation<any>();

  return (
    <View style={[globalStyles.mainContainer]}>
      <View style={globalStyles.globalMargin}>
        <ScrollView>
          <Title text="Contactos" safe />
          <View></View>
          <View>
            <View style={styles.searchContainer}>
              <Icon
                name="search"
                size={20}
                color={colors.text}
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Buscar contacto"
                placeholderTextColor={colors.text}
                style={styles.searchInput}
              />
            </View>
            <Pressable
              style={styles.addButton}
              onPress={() => navigation.navigate('AddContactScreen')}>
              <Icon name="add" size={20} color={colors.primary} />
              <Text style={styles.addButtonText}>Añadir contacto</Text>
            </Pressable>
          </View>
          {sortedContacts.map((contact, index) => (
            <ContactItem
              key={index}
              {...contact}
              isFirst={index === 0}
              isLast={index === sortedContacts.length - 1}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButtonText: {
    color: colors.primary,
    marginLeft: 5,
  },
});
