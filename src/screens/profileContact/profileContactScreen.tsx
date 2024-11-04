import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, {Marker} from 'react-native-maps';
import { getWeather } from '../../config/utils/apiWeather';
import { colors } from '../../config/theme/theme';

export const ProfileScreen: React.FC<any> = ({route}) => {
  const {contact} = route.params;
  const navigation = useNavigation<any>();
  const [contactData, setContactData] = useState(contact);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [weatherData, setWeatherData] = useState<{temperature: number; weatherDescription: string; iconURL: string} | null>(null);

  useEffect(() => {
    const loadContactData = async () => {
      const updatedContact = await AsyncStorage.getItem(`contact_${contact.telephone}`);
      if (updatedContact) {
        const parsedContact = JSON.parse(updatedContact);
        setContactData(parsedContact);

        // Recuperar y parsear las coordenadas de ubicación
        if (parsedContact.location) {
          const locationData = parsedContact.location;
          setLocation({
            latitude: locationData.latitude,
            longitude: locationData.longitude,
          });
        }
      }
    };

    const unsubscribe = navigation.addListener('focus', loadContactData);

    return unsubscribe;
  }, [navigation, contact.telephone]);

  useEffect(() => {
    // Obtener el clima si existe una ubicación
    const fetchWeather = async () => {
      if (location) {
        const weather = await getWeather(location);
        if (weather) {
          setWeatherData(weather);
        }
      }
    };

    fetchWeather();
  }, [location]);

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
      Alert.alert('Contacto eliminado', 'El contacto ha sido eliminado correctamente.');
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
        // <Text style={styles.photoPlaceholder}>Sin foto</Text>
        <Icon
        name="account-circle"
        size={150}
        style={{marginRight: 10}}
        color={colors.primary}
      />
      )}
      <Text style={styles.title}>{contactData.name}</Text>
      <Text style={styles.text}>Teléfono: {contactData.telephone}</Text>
      <Text style={styles.text}>Email: {contactData.email}</Text>
      <Text style={styles.text}>Rol: {contactData.role}</Text>
      
      {/* Mostrar datos del clima */}
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Image source={{uri: weatherData.iconURL}} style={styles.weatherIcon} />
          <Text style={styles.weatherText}>{weatherData.temperature.toFixed(1)}°C</Text>
          <Text style={styles.weatherDescription}>{weatherData.weatherDescription}</Text>
        </View>
      )}
      
      {/* Map View */}
      {location && (
        <View style={styles.containerMap}>
          <MapView
            style={styles.map}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            <Marker
              coordinate={location}
              title={contactData.name}
              description={`Ubicación de ${contactData.name}`}
            />
          </MapView>
        </View>
      )}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            navigation.navigate('EditContactScreen', {contact: contactData})
          }>
          <Icon name="edit" size={24} color="black" />
          <Text style={styles.text}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={confirmDelete}>
          <Icon name="delete" size={24} color="black" />
          <Text style={styles.text}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
       backgroundColor: 'yellow'
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
    marginTop: 40
  },
  iconButton: {
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  weatherText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  weatherDescription: {
    fontSize: 16,
    color: 'grey',
    marginLeft: 5,
  },
  containerMap: {
    height: 300,
    width: '100%',
    marginTop: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


