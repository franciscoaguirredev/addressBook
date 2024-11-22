import React, {useState} from 'react';
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
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../config/theme/theme';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import GoogleMapsScreen from '../googleMaps/googleMapsScreen';
import uuid from 'react-native-uuid';

export const AddContactScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Cliente');

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 6.249468,
    longitude: -75.567938,
  });
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleOpenCamera = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
      }
    });
    closeModal();
  };

  const handleOpenGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
      }
    });
    closeModal();
  };

  const saveContact = async () => {
    try {
      console.log(photo)
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(
        'https://closetoyoureactnativebackend.onrender.com/api/contacts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name,
            phone: telephone,
            email: email,
            imageUri: photo,
            latitude: location.latitude,
            longitude: location.longitude,
          }),
        },
      );
      if (response.ok) {
      Alert.alert('Saved contact', 'The contact has been successfully saved.');
      navigation.goBack();}
    } catch (error) {
      Alert.alert('Error', 'There was a problem saving the contact.');
      console.error(error);
    }
  };

  const handleLocationSelected = (coord: {
    latitude: number;
    longitude: number;
  }) => {
    setLocation(coord);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={handleOpenCamera}>
                <Icon name="photo-camera" size={24} color={colors.primary} style={styles.modalIcon}/>
                <Text style={styles.modalOptionText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={handleOpenGallery}>
                <Icon name="photo-library" size={24} color={colors.primary}style={styles.modalIcon}/>
                <Text style={styles.modalOptionText}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalCancel} onPress={closeModal}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={styles.modalOption}>
                <Icon name="close" size={24} color={colors.primary} style={styles.modalIcon}/>
                <Text style={styles.modalOptionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.photoContainer} onPress={openModal}>
          {photo ? (
            <Image source={{uri: photo}} style={styles.photo} />
          ) : (
            <View style={styles.selectPhoto}>
              <Icon name="photo-camera" size={30} color={colors.iconColor} />
              <Text style={styles.photoText}>Add photo</Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Icon
            name="person"
            size={20}
            color={colors.iconColor}
            style={styles.icon}
          />
          <TextInput
            placeholder="Name"
            placeholderTextColor={colors.text}
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon
            name="phone"
            size={20}
            color={colors.iconColor}
            style={styles.icon}
          />
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
          <Icon
            name="email"
            size={20}
            color={colors.iconColor}
            style={styles.icon}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={colors.text}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />
        </View>



        <GoogleMapsScreen onLocationSelected={handleLocationSelected} />

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={saveContact}>
            <Icon name="save" size={24} color="white" />
            <Text style={styles.text}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()}>
            <Icon name="remove-circle" size={24} color="white" />
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: colors.cardBackground,
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 100,
    width: 150,
    height: 150,
    margin: 'auto',
  },
  selectPhoto: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: 150,
    height: 150,
    margin: 'auto',
    borderRadius: 100,
  },
  photoText: {
    color: colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
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
    padding: 10,
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
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 17,
    margin: 'auto',
  },
  iconButton: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  modalIcon: {
    marginRight: 10,
  },
});
