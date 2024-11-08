import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../config/theme/theme';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import GoogleMapsScreen from '../googleMaps/googleMapsScreen';

export const AddContactScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Cliente');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleOpenCamera = () => {
    launchCamera({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri || null);
      }
    });
    closeModal();
  };

  const handleOpenGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri || null);
      }
    });
    closeModal();
  };

  const saveContact = async () => {
    try {
      const contact = { name, telephone, email, role, location, photo };
      await AsyncStorage.setItem(`contact_${telephone}`, JSON.stringify(contact));
      Alert.alert('Contacto guardado', 'El contacto ha sido guardado correctamente.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al guardar el contacto.');
      console.error(error);
    }
  };

  const handleLocationSelected = (coord: { latitude: number; longitude: number }) => {
    setLocation(coord);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Select photo</Text>
              <TouchableOpacity style={styles.modalOption} onPress={handleOpenCamera}>
                <Icon name="photo-camera" size={24} color={colors.primary} />
                <Text style={styles.modalOptionText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={handleOpenGallery}>
                <Icon name="photo-library" size={24} color={colors.primary} />
                <Text style={styles.modalOptionText}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalCancel} onPress={closeModal}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.photoContainer} onPress={openModal}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <Icon name="photo-camera" size={30} color={colors.primary} />
          )}
          <Text style={styles.photoText}>Add photo</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Icon name="person" size={20} color={colors.primary} style={styles.icon} />
          <TextInput
            placeholder="Name"
            placeholderTextColor={colors.text}
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="phone" size={20} color={colors.primary} style={styles.icon} />
          <TextInput
            placeholder="Telephone"
            placeholderTextColor={colors.text}
            value={telephone}
            onChangeText={setTelephone}
            keyboardType="phone-pad"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color={colors.primary} style={styles.icon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor={colors.text}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="work" size={20} color={colors.primary} style={styles.icon} />
          <Picker
            selectedValue={role}
            onValueChange={itemValue => setRole(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Client" value="Client" />
            <Picker.Item label="Employee" value="Employee" />
          </Picker>
        </View>

        <GoogleMapsScreen onLocationSelected={handleLocationSelected} />

        <TouchableOpacity style={styles.saveButton} onPress={saveContact}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.primary,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  modalOptionText: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.primary,
  },
  modalCancel: {
    marginTop: 15,
  },
  modalCancelText: {
    fontSize: 16,
    color: colors.text,
  },
});
// hasta aqui funciona todo bien pero se esta tomando el telefono como ID