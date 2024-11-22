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
import {getWeather} from '../../config/utils/apiWeather';
import {colors} from '../../config/theme/theme';

interface IContactData {
  name: string,
  email:string,
  telephone: string;
  imageUri: string | null
}

export const ProfileScreen: React.FC<any> = ({route}) => {
  const {contact} = route.params;
  const navigation = useNavigation<any>();
  const [data, setContactData] = useState<IContactData>({
    name: '',
    email: '',
    telephone: '',
    imageUri: null
  });
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [weatherData, setWeatherData] = useState<{
    temperature: number;
    weatherDescription: string;
    iconURL: string;
  } | null>(null);

  useEffect(() => {
    const loadContactData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(
          `https://closetoyoureactnativebackend.onrender.com/api/contacts/${contact.id}`,
          {
            method: 'GET',
            headers: {
              'Content-type': 'aplication/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.ok) {
          const {data} = await response.json();
         
          setContactData(data);
          const latitude = Number(data.latitude);
          const longitude = Number(data.longitude);
          setLocation({
            latitude: latitude,
            longitude: longitude,
          });
        }
      } catch (error) {}
    };
    const unsubscribe = navigation.addListener('focus', loadContactData);
    return unsubscribe;
  },[navigation, contact.id]);

  useEffect(() => {
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
      'Confirm elimination',
      '¿Are you sure you want to delete this contact??',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: handleDelete,
        },
      ],
      {cancelable: true},
    );
  };

  const handleDelete = async () => {
    try {
      await AsyncStorage.removeItem(`contact_${contact.id}`);
      Alert.alert(
        'Contact deleted',
        'The contact has been successfully deleted.',
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'The contact could not be deleted.');
    }
  };

  return (
    <View style={styles.container}>
      {data.imageUri? (
        <Image source={{uri: data.imageUri}} style={styles.photo} />
      ) : (
        <Icon
          name="account-circle"
          size={150}
          style={{marginRight: 10}}
        />
      )}
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.textInfo}>{data.telephone}</Text>
      <Text style={styles.textInfo}>{data.email}</Text>

      {weatherData && (
        <View style={styles.weatherContainer}>
          <Image
            source={{uri: weatherData.iconURL}}
            style={styles.weatherIcon}
          />
          <Text style={styles.weatherText}>
            {weatherData.temperature.toFixed(1)}°C
          </Text>
          <Text style={styles.weatherDescription}>
            {weatherData.weatherDescription}
          </Text>
        </View>
      )}

      {location && (
        <View style={styles.containerMap}>
          <MapView
            style={styles.map}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <Marker
              coordinate={location}
              title={data.name}
              description={`Location of ${data.name}`}
            />
          </MapView>
        </View>
      )}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            navigation.navigate('EditContactScreen', {contact: data})
          }>
          <Icon name="edit" size={24} color={colors.iconColor} />
          <Text style={styles.text}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={confirmDelete}>
          <Icon name="delete" size={24} color={colors.iconColor} />
          <Text style={styles.text}>Delete</Text>
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
    backgroundColor: colors.primary,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 30,
  },
  photoPlaceholder: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 40,
  },
  iconButton: {
    alignItems: 'center',
  },
  text: {
    color: colors.text,
  },
  textInfo: {
    color: colors.text,
    fontSize: 22,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 10,
    paddingRight: 20,
    backgroundColor: '#0087FF',
    borderRadius: 10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  weatherText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  weatherDescription: {
    fontSize: 16,
    color: colors.text,
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
