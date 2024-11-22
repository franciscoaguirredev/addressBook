import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../config/theme/theme';

type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<any>();

  const handleLogin = async (email: string, password: string) => {
    try {
      await AsyncStorage.setItem('token', '');
      if (email == undefined && !password == undefined) {
        setModalVisible(true);
      } else {
        const response = await fetch(
          'https://closetoyoureactnativebackend.onrender.com/api/auth/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          },
        );

        if (response.ok) {
          const {data} = await response.json();
          await AsyncStorage.setItem('token', data.accessToken);
          setModalVisible(true);
          Alert.alert('Welcome!');
          navigation.navigate('HomeScreen');
        } else {
          Alert.alert('Error', 'There was a problem with login');
          setModalVisible(false);
        }
      }
    } catch (error) {
      console.error('Error al verificar credenciales:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Close To You - X-Ray</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor={colors.text}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña"
          placeholderTextColor={colors.text}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.showPasswordText}>
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogin(email, password)}>
        <Text style={styles.buttonText}>Acceder</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.linkText}>¿No tienes cuenta? ¡Regístrate!</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Verificar correo o contraseña</Text>
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
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
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'black',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: 'Black',
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  showPasswordText: {
    color: '#007BFF',
    fontWeight: 'bold',
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007BFF',
    textAlign: 'center',
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    // backgroundColor: '#fff',
    backgroundColor: '#000',
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

export default LoginScreen;
