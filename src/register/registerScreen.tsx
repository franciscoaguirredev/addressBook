import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

const RegisterScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<any>();

  const pickImage = (source: 'camera' | 'gallery') => {
    const options: CameraOptions = {
      mediaType: 'photo', // 'photo' es un valor válido para 'mediaType'
      includeBase64: false,
      maxWidth: 200,
      maxHeight: 200,
    };

    if (source === 'camera') {
      launchCamera(options, response => {
        if (response?.assets && response.assets.length > 0) {
          setImage(response.assets[0].uri ?? null); // Asegúrate de manejar undefined
        } else if (response?.errorCode) {
          Alert.alert('Error', 'No se pudo acceder a la cámara.');
        }
      });
    } else {
      launchImageLibrary(options, response => {
        if (response?.assets && response.assets.length > 0) {
          setImage(response.assets[0].uri ?? null); // Asegúrate de manejar undefined
        } else if (response?.errorCode) {
          Alert.alert('Error', 'No se pudo acceder a la galería.');
        }
      });
    }
  };

  // Función para guardar el usuario en AsyncStorage
  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      setModalVisible(true);
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      Alert.alert('Error', 'No se pudo completar el registro.');
    }
  };

  // Cierra el modal y regresa al login
  const handleModalClose = () => {
    setModalVisible(false);
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{uri: image}} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>Selecciona una imagen</Text>
        )}
        <View style={styles.imageButtons}>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => pickImage('camera')}>
            <Text style={styles.buttonText}>Cámara</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => pickImage('gallery')}>
            <Text style={styles.buttonText}>Galería</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Registro exitoso</Text>
            <Button title="Ir a Login" onPress={handleModalClose} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  imageButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  imageButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  registerButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default RegisterScreen;
