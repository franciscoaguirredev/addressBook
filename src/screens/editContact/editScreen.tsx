// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Alert,
// } from 'react-native';
// import {TextInput} from 'react-native-gesture-handler';
// import {colors} from '../../config/theme/theme';
// import React, {useState} from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {Picker} from '@react-native-picker/picker';
// import {useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import {launchCamera} from 'react-native-image-picker';

// export const EditScreen: React.FC<any> = ({route}) => {
//   const {contact} = route.params;

//   const navigation = useNavigation();
//   const [name, setName] = useState('');
//   const [telephone, setTelephone] = useState('');
//   const [email, setEmail] = useState('');
//   const [role, setRole] = useState('Cliente');
//   const [location, setLocation] = useState('');
//   const [photo, setPhoto] = useState<string | null>(null);

//   const handleOpenCamera = () => {
//     launchCamera({mediaType: 'photo'}, response => {
//       if (response.assets && response.assets.length > 0) {
//         setPhoto(response.assets[0].uri || null);
//       }
//     });
//   };

//   const saveContact = async () => {
//     try {
//       const contact = {name, telephone, email, role, location, photo};
//       await AsyncStorage.setItem(
//         `contact_${telephone}`,
//         JSON.stringify(contact),
//       );
//       Alert.alert(
//         'Contacto guardado',
//         'El contacto ha sido guardado correctamente.',
//       );
//       navigation.goBack();
//     } catch (error) {
//       Alert.alert('Error', 'Hubo un problema al guardar el contacto.');
//       console.error(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Foto */}
//       <TouchableOpacity
//         style={styles.photoContainer}
//         onPress={handleOpenCamera}>
//         {photo ? (
//           <Image source={{uri: photo}} style={styles.photo} />
//         ) : (
//           <Icon name="photo-camera" size={30} color={colors.primary} />
//         )}
//         <Text style={styles.photoText}>Añadir foto</Text>
//       </TouchableOpacity>

//       {/* Nombre */}
//       <View style={styles.inputContainer}>
//         <Icon
//           name="person"
//           size={20}
//           color={colors.primary}
//           style={styles.icon}
//         />
//         <TextInput
//           placeholder="Nombre"
//           placeholderTextColor={colors.text}
//           onChangeText={setName}
//           style={styles.input}>
//           {contact.name}
//         </TextInput>
//       </View>

//       {/* Teléfono */}
//       <View style={styles.inputContainer}>
//         <Icon
//           name="phone"
//           size={20}
//           color={colors.primary}
//           style={styles.icon}
//         />
//         <TextInput
//           placeholder="Teléfono"
//           placeholderTextColor={colors.text}
//           onChangeText={setTelephone}
//           keyboardType="phone-pad"
//           style={styles.input}>
//           {contact.telephone}
//         </TextInput>
//       </View>

//       {/* Email */}
//       <View style={styles.inputContainer}>
//         <Icon
//           name="email"
//           size={20}
//           color={colors.primary}
//           style={styles.icon}
//         />
//         <TextInput
//           placeholder="Email"
//           placeholderTextColor={colors.text}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           style={styles.input}>
//           {contact.email}
//         </TextInput>
//       </View>

//       {/* Rol */}
//       <View style={styles.inputContainer}>
//         <Icon
//           name="work"
//           size={20}
//           color={colors.primary}
//           style={styles.icon}
//         />
//         <Picker
//           selectedValue={role}
//           onValueChange={itemValue => setRole(itemValue)}
//           style={styles.picker}>
//           <Picker.Item label="Cliente" value="Cliente" />
//           <Picker.Item label="Empleado" value="Empleado" />
//         </Picker>
//       </View>

//       {/* Ubicación */}
//       <View style={styles.inputContainer}>
//         <Icon
//           name="location-on"
//           size={20}
//           color={colors.primary}
//           style={styles.icon}
//         />
//         <TextInput
//           placeholder="Ubicación"
//           placeholderTextColor={colors.text}
//           value={location}
//           onChangeText={setLocation}
//           style={styles.input}
//         />
//       </View>

//       {/* Botón Guardar */}
//       <TouchableOpacity style={styles.saveButton} onPress={saveContact}>
//         <Text style={styles.buttonText}>Guardar</Text>
//       </TouchableOpacity>

//       {/* Botón Cancelar */}
//       <TouchableOpacity
//         style={styles.cancelButton}
//         onPress={() => navigation.goBack()}>
//         <Text style={styles.buttonText}>Cancelar</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: colors.background,
//   },
//   photoContainer: {
//     backgroundColor: 'white',
//     alignItems: 'center',
//     marginBottom: 15,
//     borderRadius: 50,
//   },
//   photo: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   photoText: {
//     color: colors.primary,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.cardBackground,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     color: colors.text,
//   },
//   picker: {
//     flex: 1,
//     color: colors.text,
//   },
//   saveButton: {
//     backgroundColor: '#bdbec3',
//     borderRadius: 8,
//     padding: 15,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   cancelButton: {
//     backgroundColor: '#bdbec3',
//     borderRadius: 8,
//     padding: 15,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: colors.primary,
//     fontSize: 16,
//   },
// });
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {colors} from '../../config/theme/theme';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {launchCamera} from 'react-native-image-picker';

export const EditScreen: React.FC<any> = ({route}) => {
  const {contact} = route.params;

  const navigation = useNavigation();
  const [name, setName] = useState(contact.name || '');
  const [telephone, setTelephone] = useState(contact.telephone || '');
  const [email, setEmail] = useState(contact.email || '');
  const [role, setRole] = useState(contact.role || 'Cliente');
  const [location, setLocation] = useState(contact.location || '');
  const [photo, setPhoto] = useState<string | null>(contact.photo || null);

  const handleOpenCamera = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri || null);
      }
    });
  };

  const saveContact = async () => {
    try {
      const updatedContact = {name, telephone, email, role, location, photo};
      await AsyncStorage.setItem(
        `contact_${telephone}`, // Guarda sobre el mismo ID en AsyncStorage
        JSON.stringify(updatedContact),
      );
      Alert.alert(
        'Contacto guardado',
        'El contacto ha sido actualizado correctamente.',
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al guardar el contacto.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Foto */}
      <TouchableOpacity
        style={styles.photoContainer}
        onPress={handleOpenCamera}>
        {photo ? (
          <Image source={{uri: photo}} style={styles.photo} />
        ) : (
          <Icon name="photo-camera" size={30} color={colors.primary} />
        )}
        <Text style={styles.photoText}>Añadir foto</Text>
      </TouchableOpacity>

      {/* Nombre */}
      <View style={styles.inputContainer}>
        <Icon
          name="person"
          size={20}
          color={colors.primary}
          style={styles.icon}
        />
        <TextInput
          placeholder="Nombre"
          placeholderTextColor={colors.text}
          onChangeText={setName}
          value={name} // Mostrar el valor inicial del contacto
          style={styles.input}
        />
      </View>

      {/* Teléfono */}
      <View style={styles.inputContainer}>
        <Icon
          name="phone"
          size={20}
          color={colors.primary}
          style={styles.icon}
        />
        <TextInput
          placeholder="Teléfono"
          placeholderTextColor={colors.text}
          onChangeText={setTelephone}
          keyboardType="phone-pad"
          value={telephone} // Mostrar el valor inicial del contacto
          style={styles.input}
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Icon
          name="email"
          size={20}
          color={colors.primary}
          style={styles.icon}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor={colors.text}
          onChangeText={setEmail}
          keyboardType="email-address"
          value={email} // Mostrar el valor inicial del contacto
          style={styles.input}
        />
      </View>

      {/* Rol */}
      <View style={styles.inputContainer}>
        <Icon
          name="work"
          size={20}
          color={colors.primary}
          style={styles.icon}
        />
        <Picker
          selectedValue={role}
          onValueChange={itemValue => setRole(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Cliente" value="Cliente" />
          <Picker.Item label="Empleado" value="Empleado" />
        </Picker>
      </View>

      {/* Ubicación */}
      <View style={styles.inputContainer}>
        <Icon
          name="location-on"
          size={20}
          color={colors.primary}
          style={styles.icon}
        />
        <TextInput
          placeholder="Ubicación"
          placeholderTextColor={colors.text}
          value={location} // Mostrar el valor inicial del contacto
          onChangeText={setLocation}
          style={styles.input}
        />
      </View>

      {/* Botón Guardar */}
      <TouchableOpacity style={styles.saveButton} onPress={saveContact}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>

      {/* Botón Cancelar */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  photoContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 50,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  photoText: {
    color: colors.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: colors.text,
  },
  picker: {
    flex: 1,
    color: colors.text,
  },
  saveButton: {
    backgroundColor: '#bdbec3',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#bdbec3',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
  },
});
