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
  const latitudeNum = Number(contact.latitude)
  const longitudeNum = Number(contact.longitude)
  const navigation = useNavigation();
  const [name, setName] = useState(contact.name || '');
  const [telephone, setTelephone] = useState(contact.phone || '');
  const [email, setEmail] = useState(contact.email || '');

  const [location, setLocation] = useState<{
    latitude: number
    longitude: number;
  }>({
    latitude: latitudeNum,
    longitude: longitudeNum
  });
  const [photo, setPhoto] = useState<string | null>(contact.imageUri || null);
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
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(
        `https://closetoyoureactnativebackend.onrender.com/api/contacts/${contact.id}`,
        {  
        method: 'PATCH',
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
      if(response.ok){
        Alert.alert(
          'Saved contact',
          'The contact has been successfully updated.',
        );
      }
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
            onChangeText={setName}
            value={name}
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
            color={colors.iconColor}
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

        <View style={styles.mapContainer}>
          <GoogleMapsScreen
            onLocationSelected={handleLocationSelect}
            initialLocation={location}
            mapHeight={300}
          />
        </View>

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
  photo: {
    width: 150,
    height: 150,
    margin: 'auto',
    borderRadius: 100,
  },
  photoText: {
    color: colors.text,
  },
  selectPhoto: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
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
  iconButton: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 0,
    margin: 'auto',
  },
});
