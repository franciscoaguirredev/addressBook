// import React, {useState, useCallback} from 'react';
// import {
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Alert,
// } from 'react-native';
// import {colors, globalStyles} from '../../config/theme/theme';
// import {Title} from '../../presentation/components/ui/Title';
// import {ScrollView} from 'react-native-gesture-handler';
// import {ContactItem} from '../../presentation/components/ui/ContactItem';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {useNavigation, useFocusEffect} from '@react-navigation/native';

// interface IContact {
//   name: string;
//   email: string;
//   telephone: string;
//   role: string;
//   image: string;
// }

// export const HomeScreen = () => {
//   const [contacts, setContacts] = useState<IContact[]>([]);
//   const [filteredContacts, setFilteredContacts] = useState<IContact[]>([]);
//   const [searchText, setSearchText] = useState('');
//   const navigation = useNavigation<any>();

//   const fetchContacts = async () => {
//     try {
//       const keys = await AsyncStorage.getAllKeys();
//       const contactKeys = keys.filter(key => key.startsWith('contact_'));
//       const storedContacts = await AsyncStorage.multiGet(contactKeys);
//       const contactList: IContact[] = storedContacts
//         .map(([key, value]) => (value ? JSON.parse(value) : null))
//         .filter(Boolean);
//       setContacts(contactList.sort((a, b) => a.name.localeCompare(b.name)));
//       setFilteredContacts(contactList.sort((a, b) => a.name.localeCompare(b.name))); // Inicialmente mostrar todos
//     } catch (error) {
//       Alert.alert('Error', 'Hubo un problema al cargar los contactos.');
//       console.error(error);
//     }
//   };

//   // Función para manejar el cambio en la búsqueda
//   const handleSearchChange = (text: string) => {
//     setSearchText(text);
//     if (text) {
//       const filtered = contacts.filter(contact =>
//         contact.name.toLowerCase().includes(text.toLowerCase())
//       );
//       setFilteredContacts(filtered);
//     } else {
//       setFilteredContacts(contacts); // Si el texto de búsqueda está vacío, muestra todos los contactos
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchContacts();
//     }, []),
//   );

//   return (
//     <View style={globalStyles.mainContainer}>
//       <View style={globalStyles.globalMargin}>
//         <ScrollView>
//           <Title text="Contactos" safe />
//           <View>
//             <View style={styles.searchContainer}>
//               <Icon
//                 name="search"
//                 size={20}
//                 color={colors.text}
//                 style={styles.searchIcon}
//               />
//               <TextInput
//                 placeholder="Buscar contacto"
//                 placeholderTextColor={colors.text}
//                 style={styles.searchInput}
//                 value={searchText}
//                 onChangeText={handleSearchChange}
//               />
//             </View>
//             <Pressable
//               style={styles.addButton}
//               onPress={() => navigation.navigate('AddContactScreen')}>
//               <Icon name="add" size={20} color={colors.primary} />
//               <Text style={styles.addButtonText}>Añadir contacto</Text>
//             </Pressable>
//           </View>
//           {filteredContacts.map((contact, index) => (
//             <ContactItem
//               key={index}
//               name={contact.name}
//               telephone={contact.telephone}
//               email={contact.email}
//               role={contact.role}
//               image={contact.image}
//               isFirst={index === 0}
//               isLast={index === filteredContacts.length - 1}
//             />
//           ))}
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.cardBackground,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginVertical: 10,
//   },
//   searchIcon: {
//     marginRight: 5,
//   },
//   searchInput: {
//     flex: 1,
//     color: colors.text,
//   },
//   addButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: colors.cardBackground,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   addButtonText: {
//     color: colors.primary,
//     marginLeft: 5,
//   },
// });
//Hasta aqui funciona la barra de busqueda

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
  const [filteredContacts, setFilteredContacts] = useState<IContact[]>([]);
  const [searchText, setSearchText] = useState('');
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
      setFilteredContacts(contactList.sort((a, b) => a.name.localeCompare(b.name))); // Inicialmente mostrar todos
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al cargar los contactos.');
      console.error(error);
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    if (text) {
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  };

  // Función para agrupar contactos por la primera letra del nombre
  const groupContactsByLetter = (contactsList: IContact[]) => {
    return contactsList.reduce((groups: {[key: string]: IContact[]}, contact) => {
      const firstLetter = contact.name.charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(contact);
      return groups;
    }, {});
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
                value={searchText}
                onChangeText={handleSearchChange}
              />
            </View>
            <Pressable
              style={styles.addButton}
              onPress={() => navigation.navigate('AddContactScreen')}>
              <Icon name="add" size={20} color={colors.primary} />
              <Text style={styles.addButtonText}>Añadir contacto</Text>
            </Pressable>
          </View>
          {Object.keys(groupedContacts).sort().map(letter => (
            <View key={letter}>
              <Text style={styles.sectionTitle}>{letter}</Text>
              {groupedContacts[letter].map((contact, index) => (
                <ContactItem
                  key={contact.telephone}
                  name={contact.name}
                  telephone={contact.telephone}
                  email={contact.email}
                  role={contact.role}
                  image={contact.image}
                  isFirst={index === 0}
                  isLast={index === groupedContacts[letter].length - 1}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'yellow',
    marginTop: 15,
    paddingHorizontal: 10,
  },
});
