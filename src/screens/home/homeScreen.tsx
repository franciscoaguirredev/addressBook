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
  id: string;
  contactId: string;
  name: string;
  email: string;
  telephone: string;
  role: string;
  image: string;
}

export const HomeScreen = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<IContact[]>([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation<any>();

  // const fetchContacts = async () => {
  //   try {
  //     setSearchText('');
  //     const keys = await AsyncStorage.getAllKeys();
  //     const contactKeys = keys.filter(key => key.startsWith('contact_'));
  //     const storedContacts = await AsyncStorage.multiGet(contactKeys);

  //     const contactList: IContact[] = storedContacts
  //       .map(([key, value]) => {
  //         if (value) {
  //           const parsedContact = JSON.parse(value);
  //           return {contactId: key.replace('contact_', ''), ...parsedContact};
  //         }
  //         return null;
  //       })
  //       .filter(Boolean) as IContact[];

  //     setContacts(contactList.sort((a, b) => a.name.localeCompare(b.name)));
  //     setFilteredContacts(
  //       contactList.sort((a, b) => a.name.localeCompare(b.name)),
  //     );
  //   } catch (error) {
  //     Alert.alert('Error', 'There was a problem loading the contacts.');
  //     console.error(error);
  //   }
  // };

  const fetchContacts = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(
        'https://closetoyoureactnativebackend.onrender.com/api/contacts',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const {data} = await response.json();
        const contactList = data.sort((a: any, b: any) =>
          a.name.localeCompare(b.name),
        );
        setContacts(
          contactList.sort((a: any, b: any) => a.name.localeCompare(b.name)),
        );
        setFilteredContacts(
          contactList.sort((a: any, b: any) => a.name.localeCompare(b.name)),
        );
        console.log(contactList);
      }
    } catch (error) {
      console.error('Error al obtener contactos:', error);
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    if (text) {
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  };

  const groupContactsByLetter = (contactsList: IContact[]) => {
    return contactsList.reduce(
      (groups: {[key: string]: IContact[]}, contact) => {
        const firstLetter = contact.name.charAt(0).toUpperCase();
        if (!groups[firstLetter]) {
          groups[firstLetter] = [];
        }
        groups[firstLetter].push(contact);
        return groups;
      },
      {},
    );
  };

  const groupedContacts = groupContactsByLetter(filteredContacts);

  useFocusEffect(
    useCallback(() => {
      fetchContacts();
    }, []),
  );

  return (
    <View style={globalStyles.mainContainer}>
      <View style={globalStyles.globalMargin}>
        <ScrollView>
          <Title text="My Contacts" safe />
          <View>
            <View style={styles.searchContainer}>
              <Icon
                name="search"
                size={20}
                color={colors.text}
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Search Contact"
                placeholderTextColor={colors.text}
                style={globalStyles.text}
                value={searchText}
                onChangeText={handleSearchChange}
              />
            </View>
            <Pressable
              style={styles.addButton}
              onPress={() => navigation.navigate('AddContactScreen')}>
              <View style={styles.searchContainerAdd}>
                <Icon
                  name="add"
                  size={20}
                  color={colors.iconColor}
                  style={styles.addIcon}
                />
                <Text style={styles.addButtonText}>Add contact</Text>
              </View>
            </Pressable>
          </View>
          {Object.keys(groupedContacts)
            .sort()
            .map(letter => (
              <View key={letter}>
                <Text style={styles.sectionTitle}>{letter}</Text>
                {groupedContacts[letter].map((contact, index) => (
                  <ContactItem
                    key={contact.id}
                    id={contact.id}
                    name={contact.name}
                    telephone={contact.telephone}
                    email={contact.email}
                    role={contact.role}
                    image={contact.image}
                    isFirst={index === 0}
                    isLast={index === groupedContacts[letter].length - 1}
                    onPress={() =>
                      navigation.navigate('ProfileContactScreen', {contact})
                    }
                  />
                ))}
              </View>
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
  searchContainerAdd: {
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
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginVertical: 10,
  },
  addButtonText: {
    color: colors.text,
    marginLeft: 0,
    fontSize: 16,
  },
  addIcon: {
    marginRight: 10,
    marginLeft: -10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 15,
    marginBottom: 2,
    paddingHorizontal: 10,
  },
});
