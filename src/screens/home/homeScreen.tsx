import React, {useState, useCallback} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import {colors, globalStyles} from '../../config/theme/theme';
import {Title} from '../../presentation/components/ui/Title';
import {ScrollView} from 'react-native-gesture-handler';
import {ContactItem} from '../../presentation/components/ui/ContactItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

interface IContact {
  name: string;
  email: string;
  telephone: string;
  role: string;
  image: string;
}

export const HomeScreen = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const navigation = useNavigation<any>();

  const fetchContacts = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const contactKeys = keys.filter(key => key.startsWith('contact_'));
      const storedContacts = await AsyncStorage.multiGet(contactKeys);
      const contactList: IContact[] = storedContacts
        .map(([key, value]) => (value ? JSON.parse(value) : null))
        .filter(Boolean);
      setContacts(contactList.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al cargar los contactos.');
      console.error(error);
    }
  };

  // Use useFocusEffect to refresh contacts when HomeScreen is focused
  useFocusEffect(
    useCallback(() => {
      fetchContacts();
    }, []),
  );

  return (
    <View style={globalStyles.mainContainer}>
      <View style={globalStyles.globalMargin}>
        <ScrollView>
          <Title text="Contactos" safe />
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
          {contacts.map((contact, index) => (
            <ContactItem
              key={index}
              name={contact.name}
              telephone={contact.telephone}
              email={contact.email}
              role={contact.role}
              image={contact.image}
              isFirst={index === 0}
              isLast={index === contacts.length - 1}
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
