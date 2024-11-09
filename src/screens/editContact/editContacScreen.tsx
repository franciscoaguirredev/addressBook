import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {colors} from '../../config/theme/theme';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import GoogleMapsScreen from '../googleMaps/googleMapsScreen';

export const EditScreen: React.FC<any> = ({route}) => {
  const {contact} = route.params;
  const navigation = useNavigation();
  const [name, setName] = useState(contact.name || '');
  const [telephone, setTelephone] = useState(contact.telephone || '');
  const [email, setEmail] = useState(contact.email || '');
  const [role, setRole] = useState(contact.role || 'Cliente');
  const [location, setLocation] = useState(contact.location || '');
  const [photo, setPhoto] = useState<string | null>(contact.photo || null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenCamera = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri || null);
      }
      setIsModalVisible(false);
    });
  };

  const handleOpenGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri || null);
      }
      setIsModalVisible(false);
    });
  };

  const handleLocationSelect = (location: {
    latitude: number;
    longitude: number;
  }) => {
    setLocation(location);
  };

  const saveContact = async () => {
    try {
      const updatedContact = {
        contactId: contact.contactId,
        name,
        telephone,
        email,
        role,
        location,
        photo,
      };
      const contactId = `contact_${contact.contactId}`;
      await AsyncStorage.setItem(contactId, JSON.stringify(updatedContact));

      Alert.alert(
        'Saved contact',
        'The contact has been successfully updated.',
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'There was a problem saving the contact.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                onPress={handleOpenCamera}
                style={styles.modalButton}>
                <Icon
                  name="photo-camera"
                  size={20}
                  color={colors.primary}
                  style={styles.modalIcon}
                />
                <Text style={styles.modalButtonText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleOpenGallery}
                style={styles.modalButton}>
                <Icon
                  name="collections"
                  size={20}
                  color={colors.primary}
                  style={styles.modalIcon}
                />
                <Text style={styles.modalButtonText}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={styles.modalButton}>
                <Icon
                  name="close"
                  size={20}
                  color={colors.primary}
                  style={styles.modalIcon}
                />
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.photoContainer}
          onPress={() => setIsModalVisible(true)}>
          {photo ? (
            <Image source={{uri: photo}} style={styles.photo} />
          ) : (
            <Icon name="photo-camera" size={30} color={colors.primary} />
          )}
          <Text style={styles.photoText}>Select photo</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Icon
            name="person"
            size={20}
            color={colors.primary}
            style={styles.icon}
          />
          <TextInput
            placeholder="Name"
            placeholderTextColor={colors.text}
            onChangeText={setName}
            value={name}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon
            name="phone"
            size={20}
            color={colors.primary}
            style={styles.icon}
          />
          <TextInput
            placeholder="Telephone"
            placeholderTextColor={colors.text}
            onChangeText={setTelephone}
            keyboardType="phone-pad"
            value={telephone}
            style={styles.input}
          />
        </View>

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
            <Picker.Item label="Client" value="Client" />
            <Picker.Item label="Employee" value="Employee" />
          </Picker>
        </View>

        <View style={styles.mapContainer}>
          <Text style={styles.mapLabel}>location</Text>
          <GoogleMapsScreen
            onLocationSelected={handleLocationSelect}
            initialLocation={location ? location : null}
            mapHeight={300}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveContact}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}>
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
  mapContainer: {
    marginVertical: 15,
  },
  mapLabel: {
    color: 'yellow',
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  modalIcon: {
    marginRight: 10,
  },
  modalButtonText: {
    color: colors.primary,
    fontSize: 16,
  },
});
