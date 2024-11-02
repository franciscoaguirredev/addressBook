import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export const ProfileScreen: React.FC<any> = ({route}) => {
  const {contact} = route.params;
  const navigation = useNavigation<any>();
  const [contactData, setContactData] = useState(contact);

  useEffect(() => {
    const loadContactData = async () => {
      const updatedContact = await AsyncStorage.getItem(
        `contact_${contact.telephone}`,
      );
      if (updatedContact) {
        setContactData(JSON.parse(updatedContact));
      }
    };

    const unsubscribe = navigation.addListener('focus', loadContactData);

    return unsubscribe;
  }, [navigation, contact.telephone]);

  const confirmDelete = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Está seguro de que desea eliminar este contacto?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: handleDelete,
        },
      ],
      {cancelable: true},
    );
  };

  const handleDelete = async () => {
    try {
      await AsyncStorage.removeItem(`contact_${contact.telephone}`);
      Alert.alert(
        'Contacto eliminado',
        'El contacto ha sido eliminado correctamente.',
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el contacto.');
    }
  };

  return (
    <View style={styles.container}>
      {contactData.photo ? (
        <Image source={{uri: contactData.photo}} style={styles.photo} />
      ) : (
        <Text style={styles.photoPlaceholder}>Sin foto</Text>
      )}
      <Text style={styles.title}>{contactData.name}</Text>
      <Text style={styles.text}>Teléfono: {contactData.telephone}</Text>
      <Text style={styles.text}>Email: {contactData.email}</Text>
      <Text style={styles.text}>Rol: {contactData.role}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            navigation.navigate('EditContact', {contact: contactData})
          }>
          <Icon name="pencil" size={24} color="black" />
          <Text style={styles.text}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={confirmDelete}>
          <Icon name="trash" size={24} color="black" />
          <Text style={styles.text}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="location" size={24} color="black" />
          <Text style={styles.text}>Ubicación</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerMap}>
        <MapView
          // provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  photoPlaceholder: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  iconButton: {
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
  containerMap: {
    height: 400,
    width: 400,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // borderColor: '#e0122e',
    // borderStyle: 'solid',
    // borderRightWidth: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
