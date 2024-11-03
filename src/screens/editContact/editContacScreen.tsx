// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Alert,
//   Modal,
// } from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
// import { colors } from '../../config/theme/theme';
// import React, { useState } from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { launchCamera } from 'react-native-image-picker';
// import GoogleMapsScreen from '../googleMaps/googleMapsScreen';

// export const EditScreen: React.FC<any> = ({ route }) => {
//   const { contact } = route.params;

//   const navigation = useNavigation();
//   const [name, setName] = useState(contact.name || '');
//   const [telephone, setTelephone] = useState(contact.telephone || '');
//   const [email, setEmail] = useState(contact.email || '');
//   const [role, setRole] = useState(contact.role || 'Cliente');
//   const [location, setLocation] = useState(contact.location || '');
//   const [photo, setPhoto] = useState<string | null>(contact.photo || null);
//   const [showMap, setShowMap] = useState(false); // Estado para mostrar el modal de Google Maps

//   const handleOpenCamera = () => {
//     launchCamera({ mediaType: 'photo' }, response => {
//       if (response.assets && response.assets.length > 0) {
//         setPhoto(response.assets[0].uri || null);
//       }
//     });
//   };

//   // const handleLocationSelect = (newLocation: string) => {
//   //   setLocation(newLocation);
//   //   setShowMap(false); // Oculta el mapa una vez que la ubicación ha sido seleccionada
//   // };

//   const handleLocationSelect = (location: { latitude: number; longitude: number }) => {
//     // const newLocation = `${location.latitude}, ${location.longitude}`; // Convierte la ubicación a un string
//     // setLocation(newLocation);
//     setLocation(location)
//     setShowMap(false); // Oculta el mapa una vez que la ubicación ha sido seleccionada
//   };

//   const saveContact = async () => {
//     try {
//       const updatedContact = { name, telephone, email, role, location, photo };
//       const contactId = `contact_${telephone}`;

//       // Guarda o actualiza el contacto en AsyncStorage
//       await AsyncStorage.setItem(contactId, JSON.stringify(updatedContact));

//       Alert.alert(
//         'Contacto guardado',
//         'El contacto ha sido actualizado correctamente.',
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
//           <Image source={{ uri: photo }} style={styles.photo} />
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
//           value={name}
//           style={styles.input}
//         />
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
//           value={telephone}
//           style={styles.input}
//         />
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
//           value={email}
//           style={styles.input}
//         />
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
//         <TouchableOpacity onPress={() => setShowMap(true)}>
//           <Icon name="edit-location" size={20} color={colors.primary} />
//         </TouchableOpacity>
//       </View>

//       {/* Modal para GoogleMapsScreen */}
//       <Modal visible={showMap} animationType="slide">
//         <GoogleMapsScreen onLocationSelected={handleLocationSelect} />
//         <TouchableOpacity
//           style={styles.closeMapButton}
//           onPress={() => setShowMap(false)}>
//           <Text style={styles.closeMapButtonText}>Cerrar</Text>
//         </TouchableOpacity>
//       </Modal>

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
//   closeMapButton: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//     backgroundColor: colors.primary,
//     padding: 10,
//     borderRadius: 5,
//   },
//   closeMapButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });
//De aqui para arriba funcional sin mostrar la ubicación actual cuando se pretende actualizar, se usa modal para actualizar y aun con input de ubicación

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {colors} from '../../config/theme/theme';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera} from 'react-native-image-picker';
import GoogleMapsScreen from '../googleMaps/googleMapsScreen';

export const EditScreen: React.FC<any> = ({route}) => {
  const {contact} = route.params;

  const navigation = useNavigation();
  const [name, setName] = useState(contact.name || '');
  const [telephone, setTelephone] = useState(contact.telephone || '');
  const [email, setEmail] = useState(contact.email || '');
  const [role, setRole] = useState(contact.role || 'Cliente');
  const [location, setLocation] = useState(contact.location || ''); // Estado para la ubicación
  const [photo, setPhoto] = useState<string | null>(contact.photo || null);

  const handleOpenCamera = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri || null);
      }
    });
  };

  const handleLocationSelect = (location: { latitude: number; longitude: number }) => {
    // Actualizamos el estado con la nueva ubicación en formato string
    // const newLocation = `${location.latitude}, ${location.longitude}`;
    setLocation(location);
  };

  const saveContact = async () => {
    try {
      const updatedContact = {name, telephone, email, role, location, photo};
      const contactId = `contact_${telephone}`;

      // Guarda o actualiza el contacto en AsyncStorage
      await AsyncStorage.setItem(contactId, JSON.stringify(updatedContact));

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
      <ScrollView>
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
          value={name}
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
          value={telephone}
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
          value={email}
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

      {/* Mapa pequeño para seleccionar ubicación */}
      <View style={styles.mapContainer}>
        <Text style={styles.mapLabel}>Ubicación</Text>
        <GoogleMapsScreen
          onLocationSelected={handleLocationSelect}
          initialLocation={location ? location : null}
          mapHeight={300} 
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
      </ScrollView>
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
  mapContainer: {
    marginVertical: 15,
  },
  mapLabel: {
    color: colors.primary,
    marginBottom: 5,
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


